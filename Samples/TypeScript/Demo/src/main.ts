/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';

/**
 * ブラウザロード後の処理
 */
if ((window as any).appHost){
  (window as any).appHost.on("startModel", ()=>{
    // create the application instance
    if (LAppDelegate.getInstance().initialize() == false) {
      return;
    }

    LAppDelegate.getInstance().run();
    if ((window as any).appHost){
      (window as any).appHost.emit("running")
    }

    window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

    window.onresize = () => {
      if (LAppDefine.CanvasSize === 'auto') {
        LAppDelegate.getInstance().onResize();
      }
    };
  })
}
else{
  window.onload = (): void => {
    // create the application instance
    if (LAppDelegate.getInstance().initialize() == false) {
      return;
    }

    LAppDelegate.getInstance().run();
    if ((window as any).appHost){
      (window as any).appHost.emit("running")
    }
  };

  /**
   * 終了時の処理
   */
  window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

  /**
   * Process when changing screen size.
   */
  window.onresize = () => {
    if (LAppDefine.CanvasSize === 'auto') {
      LAppDelegate.getInstance().onResize();
    }
  };
}
