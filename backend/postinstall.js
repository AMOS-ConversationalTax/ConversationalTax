var fs = require('fs');

const CONFIG_PATH = 'config/config.ts';
const CONFIG_SAMPLE_PATH = 'config/config.sample.ts';

const createConfig = () => {
    // No config file?
    if (!fs.existsSync(CONFIG_PATH)) {
        // Copy the sample
        fs.createReadStream(CONFIG_SAMPLE_PATH).pipe(fs.createWriteStream(CONFIG_PATH));
    }
};

createConfig();