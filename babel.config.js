module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            ...
                'react-native-reanimated/plugin',
        ],
        plugins: [
            'module:react-native-dotenv',
        ],
    };
};
module.exports = {
    presets: ['babel-preset-expo'],
};