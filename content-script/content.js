var payload_key = menuId;

browser.storage.sync.get("payload_map").then(function (result) {
  let payload_map = result.payload_map || {};
  insert(payload_map[payload_key]);
});

function insert(payload) {
  // 获取当前focus的元素
  let focusedInput = document.activeElement;
  if (
    (focusedInput && focusedInput.tagName.toLowerCase() === "input") ||
    focusedInput.tagName.toLowerCase() === "textarea"
  ) {
    focusedInput.value = payload;
  } else {
    insertAll(payload);
  }
}

// 向当前页面所有的输入框/textarea
function insertAll(payload) {
  //获取所有 type 为 text 或者 search 以及没有type属性的 input 标签
  var inputs = document.querySelectorAll(
    "input[type=text],input[type=search],input:not([type])"
  );
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = payload;
  }
  //获取所有 textarea 标签
  var textareas = document.getElementsByTagName("textarea");
  for (var i = 0; i < textareas.length; i++) {
    textareas[i].value = payload;
  }
}