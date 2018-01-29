jQuery(function ($) {
    'use strict';
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/mythium/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "String plucked with plastic plectrum (piezo disk signal)",
                "length": "0:03",
                "file": "pdPluck1.wav"
            }, {
                "track": 2,
                "name": "String plucked with plastic plectrum (estimated force signals)",
                "length": "0:02",
                "file": "estPluck1.wav"
            }, {
                "track": 3,
                "name": "Piezo voltage signal sent through modal synthesis engine",
                "length": "0:03",
                "file": "pdPluckString1.wav"
            }, {
                "track": 4,
                "name": "Estimated force signal sent through modal synthesis engine",
                "length": "0:03",
                "file": "estPluckString1.wav"
            }, {
                "track": 5,
                "name": "String scratched with violin bow (piezo disk signal)",
                "length": "0:03",
                "file": "pdBow2.wav"
            }, {
                "track": 6,
                "name": "String scratched with violin bow (estimated force signals)",
                "length": "0:03",
                "file": "estBow2.wav"
            }, {
                "track": 7,
                "name": "Piezo voltage signal sent through modal synthesis engine",
                "length": "0:03",
                "file": "pdBowString2.wav"
            }, {
                "track": 8,
                "name": "Estimated force signal sent through modal synthesis engine",
                "length": "0:03",
                "file": "estBowString2"
            }, {
                "track": 9,
                "name": "String hammered with metal stick (piezo disk signal)",
                "length": "0:02",
                "file": "pdHam1_clean.wav"
            }, {
                "track": 10,
                "name": "String hammered with metal stick (estimated force signals)",
                "length": "0:02",
                "file": "estHam1_clean.wav"
            }, {
                "track": 11,
                "name": "Piezo voltage signal sent through modal synthesis engine",
                "length": "0:03",
                "file": "pdHamString1_clean.wav"
            }, {
                "track": 12,
                "name": "Estimated force signal sent through modal synthesis engine",
                "length": "0:03",
                "file": "estHamString1_clean.wav"
            } ],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

//initialize plyr
plyr.setup($('#audio1'), {});
