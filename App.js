import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider, NamespacesConsumer } from "react-i18next";

import i18n from "./pages/language/i18n";
import Index from "./pages/index";

// append app to dom
ReactDOM.render(
<I18nextProvider i18n={i18n}>
<NamespacesConsumer>
        {
          t => <h1>{t('key')}</h1>
        }
      </NamespacesConsumer>
<Index />
</I18nextProvider>,
document.getElementById("div")
);