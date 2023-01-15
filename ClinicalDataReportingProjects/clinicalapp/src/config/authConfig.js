//import { LogLevel } from '@azure/msal-browser';
import env from "../config/config.json";

const authEnv = env.env?.toLocaleLowerCase() === "prod" ? "PROD" : "NONPROD";
/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const msalConfig = {
  auth: env.azureAD,

  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        // eslint-disable-next-line default-case
        // switch (level) {
        //   case LogLevel.Error:
        //     console.error(message);
        //     return;
        //   case LogLevel.Info:
        //     // console.info(message);
        //     return;
        //   case LogLevel.Verbose:
        //     console.debug(message);
        //     return;
        //   case LogLevel.Warning:
        //     console.warn(message);
        //     return;
        //}
      },
    },
  },
};

export const loginRequest = {
  scopes: ["user.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const allowedRoleMap = {
  page: {
    home: {
      path: "/",
      unAuthAllowed: true,
    },
    dashboard: {
      path: "/dashboard",
      unAuthAllowed: true,
      roles: [`SPCC.DATASYNC.${authEnv}.RW`],
    },
    analyseCharts: {
      path: "/analysecharts",
      unAuthAllowed: true,
      roles: [`SPCC.REPORTS.${authEnv}.RW`],
    },
    paySettings: {
      path: "/paySettings",
      unAuthAllowed: false,
      roles: [`SPCC.PAYSETTINGS.${authEnv}.RW`],
    },
    about: {
      path: "/about",
      unAuthAllowed: true,
    },
    notFound: {
      path: "/notFound",
      unAuthAllowed: true,
    },
    clientOnboarding: {
      all: { path: "/clientOnboarding/*" },
      list: { path: "/list" },
      details: { path: "/details" },
      users: { path: "/users" },
      unAuthAllowed: false,
      roles: [
        "DATASYNC.READ",
        "SPCC.READ",
        `SPCC.ONBOARDING.${authEnv}.RW`,
        `SPCC.ONBOARDING.TECH.${authEnv}.RW`,
      ],
    },
  },
  button: {
    "datasync~clients~updateScheduleStatus": {
      roles: [`SPCC.DATASYNC.${authEnv}.RW`],
    },
  },
};
export const checkAuth = (roleMatrix, userRoles) => {
  if (roleMatrix.unAuthAllowed) {
    return true;
  } else {
    let res = false;
    if (Array.isArray(roleMatrix.roles)) {
      res = roleMatrix.roles.some((role) => userRoles?.includes(role));
    } else {
      userRoles.includes(roleMatrix.roles);
    }
    // console.log('res', res, roleMatrix, roleMatrix.roles, userRoles);

    return res;
  }
};
export const isUserAnOnboardingTechUser = (userRoles) => {
  if (userRoles) {
    return userRoles.includes(
      `SPCC.ONBOARDING.TECH.${authEnv.toUpperCase()}.RW`
    );
  }
  return false;
};
