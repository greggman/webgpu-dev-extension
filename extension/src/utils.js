/* eslint-env webextensions */
import {settings} from './settings.js';

function getCurrentTabId() {
  return new Promise(resolve =>
    window.browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      resolve(tabs[0].id);
    }));
}

async function sendMessage(cmd, data) {
  const tabId = await getCurrentTabId();
  window.browser.tabs.sendMessage(tabId, {cmd, data}, function(response) { }); 
}

function sendMessageWithResponse(cmd, data) {
  return new Promise(async resolve => {
    const tabId = await getCurrentTabId();
    window.browser.tabs.sendMessage(tabId, {cmd, data}, (f) => {
      resolve(f);
    }); 
  });
}

export async function getExtensionLocalStorage(keys) {
  return await sendMessageWithResponse('getSessionStorage', keys);
}

export function setExtensionLocalStorage(obj) {
  sendMessage('setSessionStorage', obj);
}

function updateSettings(newSettings) {
  for (const [k, v] of Object.entries(newSettings)) {
    if (typeof v === typeof settings[k]) {
      settings[k] = v;
    }
  }
}

export async function loadSettings() {
  const keys = await getExtensionLocalStorage(['webgpu-dev-extension-settings']);
  if (keys && keys['webgpu-dev-extension-settings']) {
    updateSettings(keys['webgpu-dev-extension-settings']);
  }
}

export function saveSettings() {
  setExtensionLocalStorage({'webgpu-dev-extension-settings': settings});
}
