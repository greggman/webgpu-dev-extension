/* eslint-env webextensions */
import {settings} from './settings.js';

export async function getExtensionLocalStorage(keys) {
  return await chrome.storage.session.get(keys);
}

export async function setExtensionLocalStorage(obj) {
  return await chrome.storage.session.set(obj);
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
