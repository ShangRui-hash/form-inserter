browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs.insertCSS(tab.id, { code: "body { border: 5px solid red; }" });
});

// 检查payloadList是否存在，不存在则初始化存储数据
browser.storage.sync.get("payload_map", function (result) {
  if (!result) {
    browser.storage.sync.set({ payload_map: {} });
  }
});

// 渲染右键菜单
function renderContextMenu() {
  browser.storage.sync.get("payload_map").then(function (result) {
    const payload_map = result.payload_map || {};
    for (let key in payload_map) {
      browser.contextMenus.create({
        id: key,
        title: key,
        contexts: ["page", "editable"],
      });
    }
  });
}

renderContextMenu();

// 监听右键菜单点击事件
browser.contextMenus.onClicked.addListener(function (info, tab) {
  // 判断点击的菜单项 ID
  browser.tabs.executeScript(
    {
      code: `var menuId = "${info.menuItemId}";  `,
    },
    function () {
      // 注入脚本到当前标签页
      browser.tabs.executeScript({
        file: "content-script/content.js",
      });
    }
  );
});
