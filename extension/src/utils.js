/* eslint-env webextensions */
import {settings} from './settings.js';

async function getCurrentTabId() {
  const tabs = await window.browser.tabs.query({ active: true, currentWindow: true });
  return tabs[0].id;
}

async function sendMessageWithResponse(cmd, data) {
  const tabId = await getCurrentTabId();
  return await window.browser.tabs.sendMessage(tabId, {cmd, data});
}

export async function getExtensionLocalStorage(keys) {
  return await sendMessageWithResponse('getSessionStorage', keys);
}

export async function setExtensionLocalStorage(obj) {
  return await sendMessageWithResponse('setSessionStorage', obj);
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

export async function saveSettings() {
  return await setExtensionLocalStorage({'webgpu-dev-extension-settings': settings});
}
