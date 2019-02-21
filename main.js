const Command = require('./command');
const { Message, OpType, Location, Profile } = require('../curve-thrift/line_types');

class LINE extends Command {
    constructor() {
        super();
        this.receiverID = '';
        this.messages;
        this.payload
    }

    get myBot() {
        const bot = ['ue83dcf30633e63bd39b2fa25564d3ce8'];
        return bot; 
    }

    isAdminOrBot(param) {
        return this.myBot.includes(param);
    }
    
    poll(operation) {
        if(operation.type == 13) {
            return this._acceptGroupInvitation(operation.param1);
        }
        if(operation.type == 25 || operation.type == 26) {
            let message = new Message(operation.message);
            this.receiverID = message.to = (operation.message.to === this.myBot[0]) ? operation.message._from : operation.message.to ;
            Object.assign(message,{ ct: operation.createdTime.toString() });
            this.textMessage(message)
        }
        for (let key in OpType) {
            if(operation.type == OpType[key]) {
                if(key !== 'NOTIFIED_UPDATE_PROFILE') {
                    console.info(`[* ${operation.type} ] ${key} `);
                }
            }
        }
    }
    async textMessage(messages) {
        this.messages = messages;
        let payload = (this.messages.text !== null) ? this.messages.text.split(' ').splice(1).join(' ') : '' ;
        let receiver = messages.to;
        let sender = messages.from;
        if(this.messages.text !== null) {
        	if(this.messages.text === `spam1 ${payload}`.trim() || this.messages.text === `Spam1 ${payload}`.trim()) {
                this.spamGroup1.bind(this)();
                return;
            }
            if(this.messages.text === `kick ${payload}`.trim() || this.messages.text === `Kick ${payload}`.trim()) {
                this.kickTicket.bind(this)();
                return;
            }
            if(this.messages.text === 'speed'.trim() || this.messages.text === 'Speed'.trim()) {
                this.getSpeed.bind(this)();
                return;
            }
            if(this.messages.text === `cancel ${payload}`.trim() || this.messages.text === `Cancel ${payload}`.trim()) {
                this.cancelMember.bind(this)();
                return;
            }
            if(this.messages.text === `.spam ${payload}`.trim()) {
                await this._findAndAddContactsByMid(payload[0])
                this.spamGroup.bind(this)();
                return;
            }
            if(this.messages.text === `.span ${payload}`.trim()) {
                await this._findAndAddContactsByMid(payload[0])
                this.spamRoom.bind(this)();
                return;
            }
            if(this.messages.text === 'hadeh spam'.trim()) {
                this.kickAll.bind(this)();
                return;
            }
        }
    }
}


module.exports = LINE;
