module.exports = function(RED) {
    function Whisper(config) {
        RED.nodes.createNode(this,config)
        let node = this
        let command = ''
        const path = require('path')
        const fs = require('fs')
        const jsonPath = path.join(__dirname, 'path.json')
        const json = fs.readFileSync(jsonPath)
        const transcriptionPath = path.join(__dirname, 'transcription.py')
        const tmpText = path.join(__dirname, `${this.id}.tmp`)

        const pythonPath = JSON.parse(json).NODE_PYENV_PYTHON
        const execSync = require('child_process').execSync
        let voicepath = config.voicepath

        node.on('input', function(msg) {
            if(typeof msg.voicepath !== 'undefined' && msg.voicepath !== '') {
                voicepath = msg.voicepath
            }
            command = pythonPath + ' ' + transcriptionPath + ' ' + voicepath + ' ' + config.language + ' ' + config.model + ' ' + this.id
            execSync(command)
            msg.payload = String(fs.readFileSync(tmpText))
            node.send(msg)
        })
    }
    RED.nodes.registerType('whisper',Whisper)
}
