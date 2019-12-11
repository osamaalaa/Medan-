declare var Skylink: any;
declare var attachMediaStream: any;

export class SkylinkTS {

    private localVideoContainerEl: HTMLElement;
    private remoteContainerEl: HTMLElement;
    private downloadLinkContainerEl: HTMLElement;
    private chatUserListContainerEl: HTMLElement;
    private chatMessagesContainerEl: HTMLElement;
    private messageInputEl: HTMLInputElement;
    private sendChatMessageBtnEl: HTMLButtonElement;
    private config: any;
    public skylink: any;

    constructor(options: any) {
        this.skylink = new Skylink();
        this.skylink.setLogLevel(this.skylink.LOG_LEVEL.INFO);

        (window as any).config = {
            'appKey': options.appKey,
            'appKeySecret': options.appKeySecret,
            'defaultRoom': options.defaultRoom,
            'enableDataChannel': options.enableDataChannel || true,
            'enableIceTrickle': options.enableDataChannel || true,
            'audioFallback': options.audioFallback,
            'forceSSL': options.forceSSL,
            'audio': options.audio,
            'video': options.video,
            'localVideoContainerElId': options.localVideoContainerElId || 'localVideoContainer',
            'remoteContainerElId': options.remoteContainerElId || 'remoteContainer',
            'downloadLinkContainerElId': options.downloadLinkContainerElId || 'downloadLinkContainer',
            'chatUserListContainerElId': options.chatUserListElId || 'chatUserListContainer',
            'chatMessagesContainerId': options.chatMessagesContainerId || 'chatMessagesContainer',
            'messageInputElId': options.messageInputElId || 'messageInput',
            'sendChatMessageBtnElId': options.sendChatMessageBtnElId || 'sendChatMessageBtn'
        };

        this.config = (window as any).config;
        this.skylink = new Skylink();
    }

    public joinRoom() {
        this.cacheEl();
        this.initListners();

        this.skylink.init(this.config, (error, success) => {
            if (success) {
                this.skylink.joinRoom({
                    'audio': this.config.audio,
                    'video': this.config.video,
                    bandwidth: {
                        video: 1024
                    }
                });

                this.initOnEvents();
            }
        });
    }

    public sendMessage(message: string): void {
        if (this.thereIsMessage(message)) {
            const checkedPeers: Array<String> = this.getCheckedPeers();

            if (checkedPeers[0]) {
                this.skylink.sendP2PMessage(message.trim(), this.getCheckedPeers());
            } else {
                this.skylink.sendP2PMessage(message.trim());
            }

            this.messageInputEl.value = '';
        }
    }

    public muteAudio(): void {
        this.skylink.muteStream({
            'audioMuted': !this.skylink.getPeerInfo().mediaStatus.audioMuted,
            'videoMuted': this.skylink.getPeerInfo().mediaStatus.videoMuted
        });
    }

    public pauseVideo(): void {
        this.skylink.muteStream({
            'videoMuted': !this.skylink.getPeerInfo().mediaStatus.videoMuted,
            'audioMuted': this.skylink.getPeerInfo().mediaStatus.audioMuted
        });
    }

    public leaveRoom(): void {
        this.localVideoContainerEl.innerHTML = '';
        this.skylink.leaveRoom();
    }

    public shareScreen(): void {
        this.skylink.shareScreen();
    }

    public stopScreen(): void {
        this.skylink.stopScreen();
    }

    public startRecording(): void {
        this.skylink.startRecording();
    }

    public stopRecording(): void {
        this.skylink.stopRecording();
    }

    private initOnEvents(): void {
        this.onMediaAccessSuccess();
        this.onIncomeStrem();
        this.onStremEnded();
        this.onPeerLeftEvent();
        this.onRecordingStateChange();
        this.onPeerJoined();
        this.onIncomingMessage();
    }

    private cacheEl(): void {
        this.localVideoContainerEl = document.getElementById(this.config.localVideoContainerElId);
        this.remoteContainerEl = document.getElementById(this.config.remoteContainerElId);
        this.downloadLinkContainerEl = document.getElementById(this.config.downloadLinkContainerElId);
        this.chatUserListContainerEl = document.getElementById(this.config.chatUserListContainerElId);
        this.chatMessagesContainerEl = document.getElementById(this.config.chatMessagesContainerId);
        this.messageInputEl = <HTMLInputElement>document.getElementById(this.config.messageInputElId);
        this.sendChatMessageBtnEl = <HTMLButtonElement>document.getElementById(this.config.sendChatMessageBtnElId);
    }

    private initListners() {
        if (this.sendChatMessageBtnEl) {
            const that = this;

            this.sendChatMessageBtnEl.addEventListener('click', evt => {
                that.sendMessage(that.messageInputEl.value);
            });
        }
    }

    private onMediaAccessSuccess(): void {
        this.skylink.on('mediaAccessSuccess', localStream => {
            const videoElContainer = this.createLocalVideoTagContainer();
            this.localVideoContainerEl.appendChild(videoElContainer);
            attachMediaStream(videoElContainer, localStream);
            this.addControlsToLocalVideoEl(this.localVideoContainerEl);

            console.log('mediaAccessSuccess');
        });
    }

    private createLocalVideoTagContainer(): HTMLElement {
        const video: HTMLElement = document.createElement('video');

        video.classList.add('video-container');
        video.setAttribute('autoplay', 'autoplay');

        return video;
    }

    private addControlsToLocalVideoEl(localVideoContainerEl: HTMLElement): void {
        localVideoContainerEl.appendChild(this.addMuteLocalStreamBtnToLocalAudio());
        localVideoContainerEl.appendChild(this.addPauseLocalStreamBtnToLocalVideo());
        localVideoContainerEl.appendChild(this.addLeaveLocalStreamBtnToLocalVideo());
    }

    private addMuteLocalStreamBtnToLocalAudio(): HTMLElement {
        const btn: HTMLElement = document.createElement('button');

        btn.textContent = 'Mute Audio';
        btn.classList.add('local-video-link-control');
        btn.addEventListener('click', evt => this.muteAudio());

        return btn;
    }

    private addPauseLocalStreamBtnToLocalVideo(): HTMLElement {
        const btn: HTMLElement = document.createElement('button');

        btn.textContent = 'Pause Video';
        btn.classList.add('local-video-link-control');
        btn.addEventListener('click', evt => this.pauseVideo());

        return btn;
    }

    private addLeaveLocalStreamBtnToLocalVideo(): HTMLElement {
        const btn: HTMLElement = document.createElement('button');

        btn.textContent = 'Leave Call';
        btn.classList.add('local-video-link-control');
        btn.addEventListener('click', evt => this.leaveRoom());

        return btn;
    }

    private onIncomeStrem(): void {
        this.skylink.on('incomingStream', (peerId, stream, isSelf, peerInfo) => {
            if (!isSelf) {
                console.log('addPeerStream');
                let DOMRemoteVideo = document.getElementById('remote_' + peerId);

                if (!DOMRemoteVideo) {
                    DOMRemoteVideo = document.createElement('video');
                    DOMRemoteVideo.setAttribute('style', 'width: 320px; height: 240px;');

                    if ((window as any).webrtcDetectedBrowser !== 'IE') {
                        DOMRemoteVideo.setAttribute('autoplay', 'autoplay');
                    }

                    DOMRemoteVideo.setAttribute('id', 'remote_' + peerId);
                    this.remoteContainerEl.appendChild(DOMRemoteVideo);

                    DOMRemoteVideo.onclick = () => this.skylink.refreshConnection(peerId);
                }

                attachMediaStream(DOMRemoteVideo, stream);
            }
        });
    }

    private onStremEnded(): void {
        this.skylink.on('streamEnded', (peerID, peerInfo, isSelf) => {
            if (!isSelf) {
                console.log('streamEnded');
                const DOMvideo: any = document.getElementById('remote_' + peerID);

                try {
                    if (DOMvideo) {
                        DOMvideo.src = '';
                        this.remoteContainerEl.removeChild(DOMvideo);
                    }
                } catch (error) {
                }
            }
        });
    }

    private onPeerLeftEvent(): void {
        this.skylink.on('peerLeft', peerID => {
            const DOMvideo: any = document.getElementById('remote_' + peerID);
            console.log('peerLeft');

            const peerChatIdContainer = document.getElementById(`container_peer_id_${peerID}`);

            if (peerChatIdContainer) {
                peerChatIdContainer.remove();
            }

            try {
                if (DOMvideo) {
                    DOMvideo.src = '';
                }
            } catch (error) {
                console.log(error);
            }
        });
    }

    private onRecordingStateChange(): void {
        this.skylink.on('recordingState', (state, recordingId, url, error) => {
            console.log('recordingState', state, recordingId, url, error);

            const that: any = this;

            switch (state) {
                case that.skylink.RECORDING_STATE.START:
                    console.log('Recording session was started');
                    break;
                case that.skylink.RECORDING_STATE.STOP:
                    console.log('Recording was stopped');
                    break;
                case that.skylink.RECORDING_STATE.LINK:
                    for (const prop in url) {
                        if (url.hasOwnProperty(prop) && url[prop]) {
                            this.downloadLinkContainerEl.innerHTML += '<a class="btn btn-default" ' + (['IE', 'safari'].indexOf((window as any).webrtcDetectedBrowser) > -1 ? 'target="_blank" ' : '') +
                                'href="' + url[prop] + '" style="width:100%;margin:7px 0;display:block;" download="' + recordingId + '_' + prop + '.mp4">' +
                                '<span class="glyphicon glyphicon-cloud-download"></span> <b>Download Recording (' + (prop !== 'mixin' ? 'Peer ' : '') + prop + ')</b></a>';
                        }
                    }
                    break;
                case that.skylink.RECORDING_STATE.ERROR:
                    console.log('Recording error');
                    break;
            }
        });
    }

    private onPeerJoined(): void {
        this.skylink.on('peerJoined', (peerId, peerInfo, isSelf) => {
            const div = this.createUserDivForChatList(peerId, peerInfo, isSelf);
            this.chatUserListContainerEl.appendChild(div);
        });
    }

    private onIncomingMessage(): void {
        this.skylink.on('incomingMessage', (message, peerId, peerInfo, isSelf) => {
            const div = document.createElement('div');

            div.innerHTML = `<p>${isSelf ? '(ME)' : ''} ${peerId} > ${message.content}</p>`;

            this.chatMessagesContainerEl.appendChild(div);
        });
    }

    private createUserDivForChatList(peerId, peerInfo, isSelf): HTMLElement {
        const div = document.createElement('div');
        div.id = `container_peer_id_${peerId}`;

        const peerCheckbox = `<input type="checkbox" id="peer_id_${peerId}" data-id="${peerId}" name="peer_id_${peerId}"/>`;

        div.innerHTML = `
            <div class="chat-list">
                <div>
                    <label for='peer_id_${peerId}'>${isSelf ? '(ME)' : ''} ${peerId}</label>
                    ${isSelf ? '' : peerCheckbox}
                </div>
            </div>`;

        return div;
    }

    private getCheckedPeers(): Array<String> {
        const checkboxes: any = this.chatUserListContainerEl.getElementsByTagName('input');
        const peerList = new Array<String>();

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                peerList.push(checkboxes[i].getAttribute('data-id'));
            }
        }

        return peerList;
    }

    private thereIsMessage(message): boolean {
        return message !== undefined && message !== '';
    }

}
