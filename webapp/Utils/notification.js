"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ title = '', body = '' }) => {
    const specs = {
        title,
        body,
    };
    if (Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function (status) {
            if (status === 'granted') {
                const notification = new Notification(title, {
                    body
                });
            }
            else {
                alert(`[Notification] ${title}: ${body}`);
            }
        });
    }
    console.info(`[Notification] ${title}: ${body}`);
};
//# sourceMappingURL=notification.js.map