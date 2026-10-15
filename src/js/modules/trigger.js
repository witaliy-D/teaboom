import { parseDataList } from "../utility/parseDataList"
import { isNumber } from "../utility/util"

//*  data-trigger - вызывает событие у элемента
//*  Все дата атрибуты отправляется вместе с triggerData (кроме самого trigger)
//*  аргументы:
//*     1. селектор/ид - $(triggerElement) (window, document)
//*     2. Имя события (можно передать более одного через пробел "event event-1 event-2")
//*     3. число - для setTimeout
//*     4. ';' - позволяет разделить и задать для нескольких элементов события
//*  data-trigger="#modal-form, modal:open, 400; #modal-video, modal:open"
//*  data-trigger="#modal-form, modal:open, 400"
//*  data-trigger="#modal-form, modal:open, 400"


document.querySelectorAll("[data-trigger]").forEach(($trigger, index) => {
  trigger($trigger, $trigger.dataset.trigger, "trigger", "click");
});
//*
export function trigger($root, config, configName, eventName) {
  // Если уже был вызван триггер для этого элемента, выходим
  if ($root.__trigger) return
  $root.__trigger = true
  // Парсим конфигурацию из строки
  config = parseDataList(config)

  //*
  Object.keys(config).forEach(index => {
    //*
    const data = config[index]
    //*
    let triggerElement = data[0] || false
    const triggerEvent = data[1] || false
    const triggerDelay = data[2]
    // Устанавливаем элемент триггера как `window` или `document`, если это указано
    if (triggerElement === 'window') triggerElement = window
    if (triggerElement === 'document') triggerElement = document
    //*
    if (triggerElement && triggerEvent) {
      if (triggerDelay) {
        if (!isNumber(triggerDelay)) {
          console.error("trigger delay error: ", triggerDelay, ' only Number');
          return
        }
        // Добавляем событие с задержкой
        $root.addEventListener(eventName, () => {
          setTimeout(() => {
              const event = new CustomEvent(triggerEvent, { detail: { data: parceDataset(), trigger: $root } });
              document.querySelector(triggerElement).dispatchEvent(event);
            }, triggerDelay
          )
        })
      }
      else {
        // Добавляем событие без задержки
        $root.addEventListener(eventName, () => {
          const event = new CustomEvent(triggerEvent, { detail: { data: parceDataset(), trigger: $root } });
          document.querySelector(triggerElement).dispatchEvent(event);
        })
      }
    }
  })

  // Функция для парсинга данных атрибутов
  function parceDataset() {
    let triggerData = {}
    Object.keys($root.dataset).forEach(data => {
      if (data != configName) {
        const dataValue = $root.dataset[data].trim()
        // Преобразуем значения данных в соответствующие типы (Number, Boolean, String)
        //triggerData[data] = isNaN(dataValue) ? (dataValue === "true" ? true : dataValue === "false" ? false : dataValue) : Number(dataValue);
        triggerData[data] = Number(dataValue) ? Number(dataValue) : dataValue === 'true' ? true : dataValue === 'false' ? false : dataValue
      }
    });
    return triggerData
  }
}
