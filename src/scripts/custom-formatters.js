if (typeof GPUAdapter !== 'undefined') {
  console.log('webgpu-dev-extension: custom-formatters');

  const expandStyle = {style: 'list-style-type: none; margin: 0; padding-left: 24px;'};

  const headerConfig = {
    innerTag: 'span',
    nameStyle: { style: 'color: var(--sys-color-token-subtle' },
    valueStyle: { style: 'color: var(--sys-color-token-attribute-value' },
    propertySpecialStyle: { style: 'color: var(--sys-color-token-property-special' },
    format(object, props) {
      return [
        'span',
        ['span', `${object.constructor.name} {`],
        ...props.flatMap(v => [', ', v]).slice(1),
        '}',
      ];
    },
  };

  const bodyConfig = {
    innerTag: 'li',
    nameStyle: { style: 'color: var(--sys-color-token-tag);' },
    valueStyle: { style: 'color: var(--sys-color-token-attribute-value' },
    propertySpecialStyle: { style: 'color: var(--sys-color-token-property-special' },
    format(object, props) {
      return [
        'ol', expandStyle, ...props,
      ];
    },
  };

  function getJsonML(object, config) {
    const {
      innerTag,
      nameStyle,
      propertyFormatters,
    } = config;

    function getValue(key, value) {
      const formatter = propertyFormatters[key];
      return formatter
        ? formatter(key, value, config)
        : ['object', {object: value}];
    }

    const props = [];
    for (const key in object) {
      const value = object[key];
      if (typeof value !== 'function') {
        props.push([
            innerTag,
            ['span', nameStyle, key],
            ': ',
            getValue(key, value),
        ]);
      }
    }

    return props;
  }

  function bitmaskToString(bitNames, value) {
    const names = [];
    for (const [k, v] of Object.entries(bitNames)) {
      if (value & v) {
        names.push(k);
      }
    }
    return names.join('|');
  }

  function getBitmaskJsonML(bitNames, value, { valueStyle, propertySpecialStyle }) {
    return [
      'span',
      ['span', valueStyle, `${value}`],
      ' (',
      ['span', propertySpecialStyle, `${bitmaskToString(bitNames, value)}`],
      ')',
    ];
  }

  function getSetAsArrayJsonML(value) {
    const array = [...value.values()].sort();
    return ['object', {object: array}];
  }

  const gpuBufferPropertyFormatters = {
    usage(key, value, config) {
      return getBitmaskJsonML(GPUBufferUsage, value, config);
    },
  };

  const gpuTexturePropertyFormatters = {
    usage(key, value, config) {
      return getBitmaskJsonML(GPUTextureUsage, value, config);
    },
  };

  const gpuHeapPropertyFormatters = {
    properties(key, value, config) {
      return getBitmaskJsonML(GPUHeapProperty, value, config);
    },
  };

  const gpuAdapterPropertyFormatters = {
    features(key, value, config) {
      return getSetAsArrayJsonML(value, config);
    },
  };

  const gpuDevicePropertyFormatters = {
    features(key, value, config) {
      return getSetAsArrayJsonML(value, config);
    },
  };

  function format(object, config) {
    const props = getJsonML(object, config);
    return config.format(object, props, config);
  }

  const gpuBufferConfig = {
    header: {
      ...headerConfig,
      propertyFormatters: gpuBufferPropertyFormatters,
    },
    body: {
      ...bodyConfig,
      propertyFormatters: gpuBufferPropertyFormatters,
    },
  };

  const gpuTextureConfig = {
    header: {
      ...headerConfig,
      propertyFormatters: gpuTexturePropertyFormatters,
    },
    body: {
      ...bodyConfig,
      propertyFormatters: gpuTexturePropertyFormatters,
    },
  };

  const gpuHeapPropertyConfig = {
    header: {
      ...headerConfig,
      propertyFormatters: gpuHeapPropertyFormatters,
    },
    body: {
      ...bodyConfig,
      propertyFormatters: gpuHeapPropertyFormatters,
    },
  };

  const gpuAdapterConfig = {
    header: {
      ...headerConfig,
      propertyFormatters: gpuAdapterPropertyFormatters,
    },
    body: {
      ...bodyConfig,
      propertyFormatters: gpuAdapterPropertyFormatters,
    },
  };

  const gpuDeviceConfig = {
    header: {
      ...headerConfig,
      propertyFormatters: gpuDevicePropertyFormatters,
    },
    body: {
      ...bodyConfig,
      propertyFormatters: gpuDevicePropertyFormatters,
    },
  };

  function getConfig(object) {
    if (object instanceof GPUBuffer) {
      return gpuBufferConfig;
    }
    if (object instanceof GPUTexture) {
      return gpuTextureConfig;
    }
    if (typeof GPUMemoryHeapInfo !== 'undefined' && object instanceof GPUMemoryHeapInfo) {
      return gpuHeapPropertyConfig;
    }
    if (object instanceof GPUAdapter) {
      return gpuAdapterConfig;
    }
    if (object instanceof GPUDevice) {
      return gpuDeviceConfig;
    }
    return undefined;
  }

  const WebGPUDevtoolsFormatter = {
    header: (object) => {
      const config = getConfig(object);
      return config
         ? format(object, config.header)
         : false;
    },
    hasBody: () => true,
    body: (object) => {
      const config = getConfig(object);
      return config
         ? format(object, config.body)
         : null;
    },
  };

  window.devtoolsFormatters = [...(window.devtoolsFormatters || []), WebGPUDevtoolsFormatter];
}
