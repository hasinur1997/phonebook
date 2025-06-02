/**
 * @package Automate WordPress Build Process
 * @Version 1.0.2
 * @author Hasinur Rahman <hasinurrahman3@gmail.com>
 * @copyright Phonebook
 *
 * @features
 * - Generate pot file
 * - Check textdomain
 * - Fix textdomain
 * - Copy files to dist directory
 * - Compress dist directory to production ready zip
 *
 * @type {{
 *  name: string,
 *  version: string,
 *  textdomain: string,
 * }}
 */
const packageJSON = require("./package.json");

const projectConfig = Object.freeze({
    name: packageJSON.name,
    distDir: `../dist/${packageJSON.name}/`,
    textdomain: packageJSON.textdomain,
    version: packageJSON.version,
    /** @const {'wp-theme' | 'wp-plugin'} */
    type: "wp-plugin",
});
/**
 * ----------------------
 * Grunt Configuration
 * ----------------------
 */
module.exports = (grunt) => {
    "use strict";

    // Determine if we're on Windows
    const isWindows = process.platform === "win32";

    // Set the command to run Composer
    const composerCmd = isWindows ? process.env.COMSPEC : "composer";

    grunt.initConfig({
        /**
         * @task clean
         * Clean dist directory before build
         */
        clean: {
            options: { force: true },
            dist: [
                projectConfig.distDir + "/**",
                projectConfig.distDir.replace(/\/$/, "") + ".zip",
            ],
        },
        /**
         * @task copy
         * Copying project files to ../dist/ directory
         */
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            "" + "**",
                            "!" + "__mocks__/**",
                            "!" + ".husky/**",
                            "!" + "Gruntfile.js",
                            "!" + "package.json",
                            "!" + "package-lock.json",
                            "!" + "composer.lock",
                            "!" + "phpcs-report.xml",
                            "!" + "phpcs.xml",
                            "!" + "node_modules/**",
                            "!" + "**/dev-*/**",
                            "!" + "**/*-test/**",
                            "!" + "**/*-beta/**",
                            "!" + "**/scss/**",
                            "!" + "**/sass/**",
                            "!" + "src/**",
                            "!" + "assets/src/**",
                            "!" + "bin/**",
                            "!" + "tests/**",
                            "!" + "**/.DS_Store/**",
                            "!" + "**/.*",
                            "!" + "**/*.map",
                            "!" + "**/*.config",
                            "!" + "**/*.config.js",
                            "!" + "**/*.config.ts",
                            "!" + "jsconfig.json",
                            "!" + "none",
                            "!" + "Installable",
                            "!" + "mix-manifest.json",
                            "!" + "README.md",
                            "!" + "*.md",
                            "!" + "tools/**",
                        ],
                        dest: projectConfig.distDir,
                    },
                ],
            },
        },
        /**
         * @task compress
         * Compress Build Files into ${project}.zip
         */
        compress: {
            dist: {
                options: {
                    force: true,
                    mode: "zip",
                    archive:
                        projectConfig.distDir.replace(projectConfig.name, "") +
                        projectConfig.name +
                        "-" +
                        projectConfig.version +
                        ".zip",
                },
                expand: true,
                cwd: projectConfig.distDir,
                src: ["**"],
                dest: "../" + projectConfig.name,
            },
        },
        /**
         * @task addtextdomain
         * Add textdomain to all php files
         */
        addtextdomain: {
            target: {
                options: {
                    textdomain: projectConfig.textdomain,
                    updateDomains: true,
                },
                files: {
                    src: [
                        "*.php",
                        "**/*.php",
                        "!node_modules/**",
                        "!tests/**",
                        "!vendor/**",
                        "!composer/**",
                    ],
                },
            },
        },
        /**
         * @task checktextdomain
         * Check textdomain in all php files
         */
        checktextdomain: {
            standard: {
                options: {
                    text_domain: projectConfig.textdomain,
                    keywords: [
                        "__:1,2d",
                        "_e:1,2d",
                        "_x:1,2c,3d",
                        "esc_html__:1,2d",
                        "esc_html_e:1,2d",
                        "esc_html_x:1,2c,3d",
                        "esc_attr__:1,2d",
                        "esc_attr_e:1,2d",
                        "esc_attr_x:1,2c,3d",
                        "_ex:1,2c,3d",
                        "_n:1,2,4d",
                        "_nx:1,2,4c,5d",
                        "_n_noop:1,2,3d",
                        "_nx_noop:1,2,3c,4d",
                    ],
                },
                files: [
                    {
                        src: [
                            "*.php",
                            "**/*.php",
                            "!node_modules/**",
                            "!tests/**",
                            "!vendor/**",
                        ],
                        expand: true,
                    },
                ],
            },
        },

        /**
         * @task run
         */
        run: {
            removeDev: {
                cmd: composerCmd,
                args: isWindows
                    ? ["/c", "composer", "install", "--no-dev"]
                    : ["install", "--no-dev"],
            },
            dumpautoload: {
                cmd: composerCmd,
                args: isWindows
                    ? ["/c", "composer", "dump-autoload", "-o"]
                    : ["dump-autoload", "-o"],
            },
            composerInstall: {
                cmd: composerCmd,
                args: isWindows ? ["/c", "composer", "install"] : ["install"],
            },
        },

        /**
         * -------------------------------------
         * @description print ASCII text
         * @see https://fsymbols.com/generators/carty/
         * -------------------------------------
         */

        screen: {
            /**
             * begin screen
             */
            begin: `
Automatic Build Tool
# Project   : ${projectConfig.name}
# Dist      : ${projectConfig.distDir}
# Version   : ${projectConfig.version}`.cyan,

            finish: `
╭─────────────────────────────────────────────────────────────────╮
│                                                                 │
│                      All tasks completed.                       │
│   Built files & Installable zip copied to the dist directory.   │
│                    ~ Automatic Build Tool ~                     │
│                                                                 │
╰─────────────────────────────────────────────────────────────────╯`.green,
        },
    });

    /**
     * ----------------------------------
     * @description Register grunt tasks
     * ----------------------------------
     */
    require("load-grunt-tasks")(grunt);
    grunt.registerMultiTask("screen", function () {
        grunt.log.writeln(this.data);
    });
    /**
     * check text domain
     */
    grunt.registerTask("ctextdomain", ["checktextdomain"]);
    /**
     * fix text domain
     */
    grunt.registerTask("ftextdomain", ["addtextdomain"]);
    /**
     * pot file generation
     */
    grunt.registerTask("build", [
        "screen:begin",
        "checktextdomain",
        "clean",
        "run:removeDev",
        "run:dumpautoload",
        "copy",
        "compress",
        "run:composerInstall",
        "run:dumpautoload",
        "screen:finish",
    ]);
};
