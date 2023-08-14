// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import Box from "@mui/material/Box";
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import templateBackground from '../login/assets/background_signin_template.png'
import logo from '../login/assets/logo.png'
export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        url,
        "stylesCommon": [
            "node_modules/patternfly/dist/css/patternfly.min.css",
            "node_modules/patternfly/dist/css/patternfly-additions.min.css",
            "lib/zocial/zocial.css"
        ],
        "styles": ["css/login.css"],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": undefined
    });

    if (!isReady) {
        return null;
    }

    return (

        <div className={getClassName("kcLoginClass")} style={{ width: "100%", display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <div id="kc-header" className={getClassName("kcHeaderClass")} style={{ marginBottom: '0px' }}>
                <div id="kc-header-wrapper" className={getClassName("kcHeaderWrapperClass")} 
                style={{ color: 'white', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', 
                fontFamily:'Montserrat, sans-serif', textTransform:'capitalize', fontSize:'30px',fontStyle:'normal',fontWeight:'600'}}>
                    <img src={logo} alt="Logo" width="100" height="100" style={{ marginBottom: '15px' }} />
                    Welcome to Gene!
                    {/* {msg("loginTitleHtml", realm.displayNameHtml)} */}
                </div>
            </div>


            <div className={clsx(displayWide && getClassName("kcFormCardAccountClass"))}>
                <header className={getClassName("kcFormHeaderClass")}>
                    {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
                        <div id="kc-locale">
                            <div id="kc-locale-wrapper" className={getClassName("kcLocaleWrapperClass")}>
                                <div className="kc-dropdown" id="kc-locale-dropdown">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a href="#" id="kc-current-locale-link">
                                        {labelBySupportedLanguageTag[currentLanguageTag]}
                                    </a>
                                    <ul>
                                        {locale.supported.map(({ languageTag }) => (
                                            <li key={languageTag} className="kc-dropdown-item">
                                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                <a href="#" onClick={() => changeLocale(languageTag)}>
                                                    {labelBySupportedLanguageTag[languageTag]}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                        displayRequiredFields ? (
                            <div className={getClassName("kcContentWrapperClass")}>
                                <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                    <span className="subtitle">
                                        <span className="required">*</span>
                                        {msg("requiredFields")}
                                    </span>
                                </div>
                                <div className="col-md-10">
                                    {/* <h1 id="kc-page-title">{headerNode}</h1> */}
                                </div>
                            </div>
                        ) : (<></>
                            // <h1 id="kc-page-title">{headerNode}</h1>
                        )
                    ) : displayRequiredFields ? (
                        <div className={getClassName("kcContentWrapperClass")}>
                            <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">*</span> {msg("requiredFields")}
                                </span>
                            </div>
                            <div className="col-md-10">
                                {showUsernameNode}
                                <div className={getClassName("kcFormGroupClass")} style={{}}>
                                    <div id="kc-username">
                                        <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                        <a id="reset-login" href={url.loginRestartFlowUrl}>
                                            <div className="kc-login-tooltip">
                                                <i className={getClassName("kcResetFlowIcon")}></i>
                                                <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {showUsernameNode}
                            <div className={getClassName("kcFormGroupClass")}>
                                <div id="kc-username">
                                    <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                                        <div className="kc-login-tooltip">
                                            <i className={getClassName("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </header>
                <div id="kc-content" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div id="kc-content-wrapper" style={{ background: 'white', padding: '40px', width:'549px' , borderRadius: '4px !important'}}>
                        <div style={{color:'#2C58C1', textAlign:'center',fontFamily:'Montserrat, sans-serif', fontSize:'25px', fontStyle:'normal', fontWeight:'600'}}>Sign in</div>
                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {/* {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div className={clsx("alert", `alert-${message.type}`)}>
                                {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                <span
                                    className="kc-feedback-text"
                                    dangerouslySetInnerHTML={{
                                        "__html": message.summary
                                    }}
                                />
                            </div>
                        )} */}
                        {children}
                        {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                            <form
                                id="kc-select-try-another-way-form"
                                action={url.loginAction}
                                method="post"
                                className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                            >
                                <div
                                    className={clsx(
                                        displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                    )}
                                >
                                    <div className={getClassName("kcFormGroupClass")}>
                                        <input type="hidden" name="tryAnotherWay" value="on" />
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a
                                            href="#"
                                            id="try-another-way"
                                            onClick={() => {
                                                document.forms["kc-select-try-another-way-form" as never].submit();
                                                return false;
                                            }}
                                        >
                                            {msg("doTryAnotherWay")}
                                        </a>
                                    </div>
                                </div>
                            </form>
                        )}
                        {displayInfo && (
                            <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                    {infoNode}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>


    );
}
