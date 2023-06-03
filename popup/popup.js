// 读取存储中的列表数据并渲染表格
function renderTable() {
  browser.storage.sync.get("payload_map", function (result) {
    const payload_map = result.payload_map || {};

    const tableBody = document
      .getElementById("payload_table")
      .getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
    for (let key in payload_map) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = key;
      row.appendChild(nameCell);

      const payloadCell = document.createElement("td");
      payloadCell.textContent = payload_map[key];
      row.appendChild(payloadCell);

      //删除按钮
      const actionCell = document.createElement("td");
      actionCell.className = "action-cell";
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "<span class='glyphicon glyphicon-trash'></span>";
      deleteButton.className = "btn btn-default btn-xs";
      deleteButton.addEventListener("click", function () {
        // 删除对应的列表项
        deletePayload(key);
      });
      actionCell.appendChild(deleteButton);
      //编辑按钮
      row.appendChild(actionCell);
      tableBody.appendChild(row);
    }
  });
}




// 添加或更新列表项
function addOrUpdatePayload(payloadName, payload) {
  browser.storage.sync.get("payload_map", function (result) {
    const payload_map = result.payload_map || {};
    payload_map[payloadName] = payload;
    browser.storage.sync.set({ payload_map: payload_map }, function () {
      renderTable(); // 重新渲染表格
      //创建右键菜单
      browser.contextMenus.create({
        id: payloadName,
        title: payloadName,
        contexts: ["page", "editable"],
      });
    });
  });
}

// 删除列表项
function deletePayload(payloadName) {
  browser.storage.sync.get("payload_map", function (result) {
    const payload_map = result.payload_map || {};
    delete payload_map[payloadName];
    browser.storage.sync.set({ payload_map: payload_map }, function () {
      renderTable(); // 重新渲染表格
      //删除右键菜单
      browser.contextMenus.remove(payloadName);
    });
  });
}

window.onload = function () {
  // 渲染表格
  renderTable();
  // 添加表单提交事件监听器
  document
    .getElementById("insert_btn")
    .addEventListener("click", function (event) {
      // 从表单中获取数据
      const payloadName = document.getElementById("payload_name").value.trim();
      const payload = document.getElementById("payload").value;
      //检查数据是否为空
      if (!payloadName || payloadName.length === 0) {
        document.getElementById("error_msg").textContent = "请输入payload名称";
        return;
      }
      if (!payload || payload.length === 0) {
        document.getElementById("error_msg").textContent = "请输入payload";
        return;
      }

      // 清空错误提示
      document.getElementById("error_msg").textContent = "";
      // 添加或更新列表项
      addOrUpdatePayload(payloadName, payload);

      // 清空表单字段
      document.getElementById("payload_name").value = "";
      document.getElementById("payload").value = "";
    });
};


