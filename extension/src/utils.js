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

export function setIcons({active, tabId}) {
  const icons = active ? {
    "16":  "/images/active/icon-16.png",
    "32":  "/images/active/icon-32.png",
    "48":  "/images/active/icon-48.png",
    "128": "/images/active/icon-128.png",
    "512": "/images/active/icon-512.png"
  } : {
    "16":  "/images/icon-16.png",
    "32":  "/images/icon-32.png",
    "48":  "/images/icon-48.png",
    "128": "/images/icon-128.png",
    "512": "/images/icon-512.png"
  };
  chrome.action.setIcon({
    path: icons,
    tabId,
  });
}