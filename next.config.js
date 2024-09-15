module.exports = {
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000, // Проверяет изменения каждые 1000 мс
            aggregateTimeout: 300, // Задержка перед перезагрузкой
            ignored: /node_modules/,
        };
        return config;
    },
    onDemandEntries: {
        maxInactiveAge: 1000 * 60 * 60, // Откладывает перезагрузку на час
        pagesBufferLength: 2,
    },
};
