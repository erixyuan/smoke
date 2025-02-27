document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const currentTimeElement = document.getElementById('current-time');
  const remainingTimeElement = document.getElementById('remaining-time');
  const lastSmokeTimeElement = document.getElementById('last-smoke-time');
  const smokeCheckDiv = document.getElementById('smoke-check');
  const smokeCountDiv = document.getElementById('smoke-count');
  const messageDiv = document.getElementById('message');
  const messageText = document.getElementById('message-text');
  
  // 按钮
  const noSmokeBtn = document.getElementById('no-smoke');
  const yesSmokeBtn = document.getElementById('yes-smoke');
  const submitCountBtn = document.getElementById('submit-count');
  const closeMessageBtn = document.getElementById('close-message');
  const resetBtn = document.getElementById('reset');
  
  // 加载数据
  loadData();
  
  // 检查是否需要显示吸烟检查
  chrome.storage.local.get(['lastCheckTime'], function(result) {
    const now = new Date().getTime();
    const lastCheck = result.lastCheckTime || 0;
    
    // 如果上次检查是一小时前，显示吸烟检查
    if (now - lastCheck >= 60 * 60 * 1000) {
      smokeCheckDiv.classList.remove('hidden');
    }
  });
  
  // 没有吸烟按钮
  noSmokeBtn.addEventListener('click', function() {
    chrome.storage.local.get(['quitTime', 'smokeFree'], function(result) {
      let quitTime = result.quitTime || new Date().getTime();
      let smokeFree = result.smokeFree || 0;
      
      // 增加一小时无烟时间
      smokeFree += 1;
      
      // 保存数据
      chrome.storage.local.set({
        quitTime: quitTime,
        smokeFree: smokeFree,
        lastCheckTime: new Date().getTime()
      }, function() {
        // 显示鼓励消息
        showMessage(`太棒了！您已经成功戒烟 ${smokeFree} 小时！再坚持 ${504 - smokeFree} 小时，您体内的尼古丁依赖就会被彻底清除！`);
        smokeCheckDiv.classList.add('hidden');
        loadData();
      });
    });
  });
  
  // 吸烟了按钮
  yesSmokeBtn.addEventListener('click', function() {
    smokeCheckDiv.classList.add('hidden');
    smokeCountDiv.classList.remove('hidden');
  });
  
  // 提交吸烟数量
  submitCountBtn.addEventListener('click', function() {
    const count = parseInt(document.getElementById('cigarette-count').value) || 1;
    
    // 记录吸烟时间和数量
    const now = new Date().getTime();
    const dateStr = new Date().toLocaleString();
    
    chrome.storage.local.get(['smokeHistory'], function(result) {
      let history = result.smokeHistory || [];
      history.push({
        time: now,
        date: dateStr,
        count: count
      });
      
      // 重置戒烟时间
      chrome.storage.local.set({
        quitTime: now,
        smokeFree: 0,
        lastCheckTime: now,
        smokeHistory: history
      }, function() {
        // 显示告诫消息
        showMessage(`您吸了 ${count} 根烟，戒烟计时已重置。今天老婆和小满都发烧了，没有一个好的身体和精力你怎么照顾你的家人！！！下次想抽烟的时候就抽自己耳光。如果连烟都戒不了，根本无法追求自己的人生。人生就是一场修行。`);
        smokeCountDiv.classList.add('hidden');
        loadData();
      });
    });
  });
  
  // 关闭消息
  closeMessageBtn.addEventListener('click', function() {
    messageDiv.classList.add('hidden');
  });
  
  // 重置按钮
  resetBtn.addEventListener('click', function() {
    if (confirm('确定要重置所有戒烟记录吗？')) {
      chrome.storage.local.clear(function() {
        loadData();
        showMessage('所有记录已重置。新的开始，加油！');
      });
    }
  });
  
  // 加载数据函数
  function loadData() {
    chrome.storage.local.get(['quitTime', 'smokeFree', 'smokeHistory'], function(result) {
      const smokeFree = result.smokeFree || 0;
      const quitTime = result.quitTime || new Date().getTime();
      const history = result.smokeHistory || [];
      
      // 更新UI
      currentTimeElement.textContent = smokeFree;
      remainingTimeElement.textContent = Math.max(0, 504 - smokeFree);
      
      if (history.length > 0) {
        const lastSmoke = history[history.length - 1];
        lastSmokeTimeElement.textContent = lastSmoke.date;
      } else if (quitTime) {
        lastSmokeTimeElement.textContent = new Date(quitTime).toLocaleString();
      } else {
        lastSmokeTimeElement.textContent = '未记录';
      }
    });
  }
  
  // 显示消息函数
  function showMessage(text) {
    messageText.textContent = text;
    messageDiv.classList.remove('hidden');
  }
}); 