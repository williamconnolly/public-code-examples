window.addEventListener('khorosWidgetOpened', function () {
    var modernChatWidget = document.getElementById('web-messenger-container');
    modernChatWidget.style.maxWidth = "400px";
    modernChatWidget.style.maxHeight = "575px";
    modernChatWidget.style.height = "100%";
    modernChatWidget.style.width = "400px";
    modernChatWidget.style.bottom = '0px';
    modernChatWidget.style.right = '20px';
    let khorosWidgetCloseButton = modernChatWidget.contentWindow.document.getElementById('khWidgetCloseButton');
    khorosWidgetCloseButton?.addEventListener('click', async function (e) {
        e.preventDefault();
        e.stopPropagation();
        getCloseConfirmation();
    });
    getMinimizeButton();
});

function getKhorosChatWindowHeader() {
    return document.getElementById('web-messenger-container').contentDocument.querySelector('.khChatWindowHeader');
}

function getMinimizeButton(){
    document.getElementById('web-messenger-container').contentDocument.getElementById('khoros-minimize-button')?.remove();
    let minimizeButton = document.createElement('button');
    minimizeButton.setAttribute('id', 'khoros-minimize-button');
    minimizeButton.textContent ='-';
    let khorosChatWindowHeader = getKhorosChatWindowHeader();
    let khorosWidgetCloseButton = document.getElementById('web-messenger-container').contentDocument.getElementById('khWidgetCloseButton');
    if (khorosChatWindowHeader && khorosWidgetCloseButton) {
        khorosChatWindowHeader.insertBefore(minimizeButton, khorosWidgetCloseButton);
    }
}

async function getOKConfirmation() {
    await window.Brandmessenger.sendMessage('end-chat');
    await window.Brandmessenger.reset();
    document.getElementById('brandMessengerBundleScript')?.remove();
    document.getElementById('web-messenger-container')?.remove();
    document.getElementById('mainpageCustomInwidget')?.remove();
}

function getCancelConfirmation() {
    document.getElementById('web-messenger-container').contentWindow.document.getElementById('close-main-div')?.remove();
}

function getCloseConfirmation() {
    document.getElementById('web-messenger-container').contentDocument.getElementById('close-main-div')?.remove();
    // Create a div element
    var divMainElement = document.createElement("div");
    divMainElement.setAttribute('id', 'close-main-div');
    // Create a paragraph element with text
    var paragraph = document.createElement("p");
    paragraph.textContent = "Close now?";

    var divSubElement = document.createElement("div");
    divSubElement.setAttribute('id', 'close-sub-div');
    // Create two buttons
    var buttonOkay = document.createElement("button");
    buttonOkay.textContent = "Close";
    buttonOkay.setAttribute('id', 'okay-button');
    buttonOkay.setAttribute('class', 'khorosconfirmationbutton');

    var buttonCancel = document.createElement("button");
    buttonCancel.textContent = "Continue";
    buttonCancel.setAttribute('id', 'cancel-button');
    buttonCancel.setAttribute('class', 'khorosconfirmationbutton');
    // Append the paragraph and buttons to the div
    divMainElement.appendChild(paragraph);
    divSubElement.appendChild(buttonOkay);
    divSubElement.appendChild(buttonCancel);
    divMainElement.appendChild(divSubElement);
    // Append the div to the document
    let khorosChatWindowHeader = getKhorosChatWindowHeader();
    if (khorosChatWindowHeader) {
        document.getElementById('web-messenger-container').contentDocument.getElementById('khChatWindowContainer')?.insertBefore(divMainElement, khorosChatWindowHeader.nextSibling);
    }

    let khWidgetCloseOkButton = document.getElementById('web-messenger-container').contentWindow.document.getElementById('okay-button');
    let khWidgetCloseCancelButton = document.getElementById('web-messenger-container').contentWindow.document.getElementById('cancel-button');
    khWidgetCloseOkButton?.addEventListener('click', function (e) {
        getOKConfirmation();
    });
    khWidgetCloseCancelButton?.addEventListener('click', function (e) {
        getCancelConfirmation();
    });
}
