import LZString from 'lz-string'


interface Config {
  pageUrL: string;
  origin: string;
  TokenAPIConfig: {
    url: string;
    clientId: string;
  };
}

interface PaymentParams {
  auth: any;
  invoiceId: string;
  // ... (остальные поля)
}

let paymentWidgedCallBack: any;
let widgetNode: HTMLElement | null = null;

const halyk = (() => {
  let isTest = true;
  function encodeParams(params: any): string {
    if (params === undefined || params === null) { return ""; }

    if (typeof params !== "object") { return "" + params; }

    var result: string[] = [];

    for (var name in params) {
      if (name) {
        result.push(name + "=" + encodeURIComponent(encodeParams(params[name])));
      }
    }

    return result.join("&");
  }
  let testConfig: Config = {
    pageUrL: "https://test-epay.homebank.kz/payform/",
    origin: "https://test-epay.homebank.kz",
    TokenAPIConfig: {
      url: "https://testoauth.homebank.kz/epay2/oauth2/token",
      clientId: "test",
    },
  };

  let prodConfig: Config = {
    pageUrL: "https://epay.homebank.kz/payform/",
    origin: "https://epay.homebank.kz",
    TokenAPIConfig: {
      url: "https://epay-oauth.homebank.kz/oauth2/token",
      clientId: "uberflower",
    },
  };

  const Config = () => {
    if (isTest) {
      return testConfig;
    } else {
      return prodConfig;
    }
  };

  let pageUrl = Config().pageUrL;
  let paymentPageOrigin = Config().origin;

  function pay(params: any) {
    location.href =
      pageUrl +
      "?params=" +
      LZString.compressToBase64(encodeParams(params)); // Возможно, здесь нужно использовать другую функцию из LZString
  }

  function onCloseDialog(result: boolean) {
    paymentWidgedCallBack({ success: result });
    document.body.removeChild(widgetNode!);
    widgetNode = null;
  }

  function onCommandRecieved(evnt: MessageEvent) {
    if (evnt.origin.indexOf(paymentPageOrigin) === 0) {
      const resultObject = JSON.parse(evnt.data);
      onCloseDialog(resultObject.success === true);
    }
  }

  function addCssClass() {
    var style = document.createElement("style");
    style.type = "text/css";
    var styleClasses = ".widgetScreen {position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 1000; background-color: rgba(5, 5, 5, 0.5); display: flex; justify-content: center; align-items: center;}";
    styleClasses += ".iframeBox{border-radius: 4px; position: relative; width: 400px; z-index: 1010; background-color: #fff; -ms-overflow-style: none; scrollbar-width: none;}";
    styleClasses += `.iframeHolder::-webkit-scrollbar {display: none;}`;
    styleClasses += ".iframeBoxHeader{padding: 0px;}";
    styleClasses += ".iframeBoxHeaderCloseButton{border-radius: 8px; cursor: pointer; width: 15px; height: 15px; content: 'X'; text-align: center; float: right; background-color: #ccc; font-family: Arial;}";
    styleClasses += ".iframeBoxHeaderCloseButtonText{font-size: 10px; font-family: sans-serif; font-weight: bold; color: #fff; padding-top: 2px;}";
    styleClasses += ".iframeBoxHeaderLabel{height:30px; text-align: center; float: left;}";
    styleClasses += ".iframeClass{ width: 100%; height: 90vh; border: none; }";
    style.innerHTML = styleClasses;
    document.getElementsByTagName("head")[0].appendChild(style);
  }


  function showPaymentWidget(params: any, callBack: any) {
    paymentWidgedCallBack = callBack;
    if (!widgetNode) {
      addCssClass();
      widgetNode = document.createElement("DIV");
      widgetNode.className = "widgetScreen";
      var iframeBox = document.createElement("DIV");
      var iframeBoxHeader = document.createElement("DIV");
      var iframeBoxLabel = document.createElement("DIV");
      var iframeBoxCloseButton = document.createElement("DIV");
      iframeBoxLabel.className = "iframeBoxHeaderLabel";
      iframeBoxCloseButton.className = "iframeBoxHeaderCloseButton";
      iframeBoxLabel.innerHTML = "";
      var iframeBoxHeaderCloseButtonText = document.createElement("DIV");
      iframeBoxHeaderCloseButtonText.innerHTML = "X";
      iframeBoxHeaderCloseButtonText.className = "iframeBoxHeaderCloseButtonText";
      iframeBoxCloseButton.appendChild(iframeBoxHeaderCloseButtonText);
      iframeBoxCloseButton.addEventListener("click", function () {
        onCloseDialog(false)
      });
      iframeBoxHeader.appendChild(iframeBoxLabel);
      iframeBoxHeader.appendChild(iframeBoxCloseButton);
      iframeBoxHeader.className = "iframeBoxHeader";
      iframeBox.className = "iframeBox";
      var iframe = document.createElement("IFRAME") as HTMLIFrameElement; // Explicitly specify the type as HTMLIFrameElement
      iframe.src =
        Config().pageUrL +
        "?params=" +
        LZString.compressToBase64(encodeParams(params)) +
        "&isShortForm=true";
      console.log("CONFIG",Config())
      console.log(LZString.compressToBase64(encodeParams(params)))
      iframe.className = "iframeClass";
      var iframeHolder = document.createElement("DIV");
      iframeHolder.className = "iframeHolder";
      iframeHolder.appendChild(iframe);


      window.addEventListener("message", onCommandRecieved, false);

      widgetNode.appendChild(iframeBox);
      document.getElementsByTagName("body")[0].appendChild(widgetNode);
    }
  }


  // Другие функции halyk...

  return {
    // p2p: p2p,
    // aft: aft,
    // oct: oct,
    pay: pay,
    showPaymentWidget: showPaymentWidget,
  };
})();

export default halyk;
