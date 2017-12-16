'use strict';

app.service("NgToastService", function(ngToast) {
    const toast = (message) => {
        ngToast.success({
            content: message,
            dismissButton: true,
            timeout: 2000,
            verticalPosition: 'bottom'
          });
    };

    return {toast};
});