const METRICS = require('pwmetrics/lib/metrics');

module.exports = {
  url: 'https://patricioperpetua.com',
  flags: {
    runs: 5 // number or runs
    ,submit: true // turn on submitting to Google Sheets
    // TODO: change upload to true when it is possible to select target folder.
    ,upload: false // turn on uploading to Google Drive
    ,view: false // open uploaded traces to Google Drive in DevTools
    ,expectations: true // turn on assertion metrics results against provides values
    // json: true,// not required, set to true if you want json output
    // outputPath: 'report.json', // not required, only needed if you have specified json output, can be "stdout" or a path
    // chromePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary', //optional path to specific Chrome location
    ,chromeFlags: '--headless' // custom flags to pass to Chrome. For a full list of flags, see http://peter.sh/experiments/chromium-command-line-switches/.
    // Note: pwmetrics supports all flags from Lighthouse
    ,showOutput: true // not required, set to false for pwmetrics not output any console.log messages
    ,failOnError: true // not required, set to true if you want to fail the process on expectations errors
  },
  expectations: {
    // these expectations values are examples, for your cases set your own
    // it's not required to use all metrics, you can use just a few of them
    // Read _Available metrics_ where all keys are defined
    // Time To First Content-full Paint
    [METRICS.TTFCP]: {
      warn: '>=1500',
      error: '>=2000'
    },
    // Time To First Meaningful Paint
    [METRICS.TTFMP]: {
      warn: '>=2000',
      error: '>=3000'
    },
    // Time To First CPU Idle
    [METRICS.TTFCPUIDLE]: {
      warn: '>=18000',
      error: '>=25000'
    },
    // Time to Time to Interactive
    [METRICS.TTI]: {
      warn: '>=25000',
      error: '>=30000'
    },
    // Speed Index
    [METRICS.SI]: {
      warn: '>=10000',
      error: '>=15000'
    }
  }
  , sheets: {
    type: 'GOOGLE_SHEETS', // sheets service type. Available types: GOOGLE_SHEETS
    options: {
      spreadsheetId: '1lOS1YDjuOjBdITuL7UhbLAoICo3wOgWOCr2qKY-EmLc',
      tableName: 'data'
    }
  }
  , clientSecret: {
    // https://developers.google.com/sheets/api/quickstart/nodejs#step_1_turn_on_the_api_name
    "installed": {
      "client_id": "320923814209-dkkugj5upqtk39ujddv968m4ls2kv5ad.apps.googleusercontent.com",
      "project_id": "quickstart-1565249619523",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_secret": "8-Tf7OWCJ0CjMhdGUtXHuBvG",
      "redirect_uris": [
        "urn:ietf:wg:oauth:2.0:oob",
        "http://localhost"
      ]
    }
  }
};
