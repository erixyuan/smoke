// 初始化插件
chrome.runtime.onInstalled.addListener(function() {
  // 设置每小时提醒
  chrome.alarms.create('smokeCheck', {
    periodInMinutes: 60
  });
  
  // 初始化存储
  chrome.storage.sync.get(['quitTime', 'smokeFree'], function(result) {
    if (!result.quitTime) {
      chrome.storage.sync.set({
        quitTime: new Date().getTime(),
        smokeFree: 0,
        lastCheckTime: 0,
        smokeHistory: []
      });
    }
  });
});

// 处理定时提醒
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'smokeCheck') {
    // 创建通知
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'images/icon128.png',
      title: '戒烟提醒',
      message: '过去一小时内您吸烟了吗？请点击插件图标进行记录。',
      priority: 2
    });
    
    // 更新最后检查时间
    chrome.storage.sync.set({
      lastCheckTime: new Date().getTime()
    });
  }
});

// 点击通知时打开弹出窗口
chrome.notifications.onClicked.addListener(function() {
  chrome.action.openPopup();
}); 