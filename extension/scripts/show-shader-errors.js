// DO NOT EDIT !!! AUTO-GENERATED-FILE !!!
(function () {
  'use strict';

  if (typeof GPUDevice !== 'undefined') {
    console.log('webgpu-dev-extension: show-shader-errors');

    const showError = async function (module, code, stack) {
      const info = await module.getCompilationInfo();
      const lines = code.split('\n');
      const messages = [...info.messages];
      messages.sort((a, b) => {
        const dl = b.lineNum - a.lineNum;
        if (dl) {
          return dl;
        }
        return b.linePos - a.linePos;
      });
      for (const {type, message, lineNum, linePos, length} of messages) {
        lines.splice(
          lineNum,
          0,
          `${''.padStart(linePos)}${''.padStart(length, '≈')} <======`,
          `${type}: ${message}`,
        );
      }
      console.error(stack);
      console.error(lines.join('\n'));
    };

    GPUDevice.prototype.createShaderModule = (function (origFn) {
      return function (desc = {}) {
        const code = desc.code;
        const stack = new Error();
        this.pushErrorScope('validation');
        const module = origFn.call(this, desc);
        this.popErrorScope().then(err => {
          if (err) {
            showError(module, code, stack);
          }
        });
        return module;
      };
    })(GPUDevice.prototype.createShaderModule);
  }

  document.currentScript?.remove();

})();
//# sourceMappingURL=show-shader-errors.js.map
