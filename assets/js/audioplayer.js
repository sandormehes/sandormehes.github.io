var audioId = 0;

$('audio').each(function () {
    audioId = audioId + 'audio' + 1;
    $(this).attr('id', audioId);

    // Obtain handles to main elements
    var audioContainer = $(this).closest().find('section'),
        audio = document.getElementById(audioId),
        audioControls = $(this).closest('section').find('.controls');
    
    // Hide the default controls
    audio.controls = false;

    // Display the user defined audio controls
    $(audioControls).show();

    // Obtain handles to buttons and other elements
    var playpause = $(this).closest('section').find('button'),
        progress = $(this).closest('section').find('progress'),
        progressBar = $(this).closest('section').find('span');

    // Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
    if (document.addEventListener) {
      // Wait for the audio's meta data to be loaded, then set the progress bar's max value to the duration of the audio
        audio.addEventListener('loadedmetadata', function () {
            progress.attr('max', audio.duration);
        });

        // Add events for all buttons
        playpause.on('click', function (e) {
            $(this).find('.fa-play').toggle();
            $(this).find('.fa-pause').toggle();
            $(audio).bind('ended', function () {
                $(this).closest('section').find('.fa-play').toggle();
                $(this).closest('section').find('.fa-pause').toggle();
            });
            if (audio.paused || audio.ended) {
                audio.play();
            } else audio.pause();
        });

        // As the audio is playing, update the progress bar
        audio.addEventListener('timeupdate', function () {
        // For mobile browsers, ensure that the progress element's max attribute is set
            if (!progress.attr('max')) progress.attr('max', audio.duration);
            progress.value = audio.currentTime;
            var value = Math.floor((audio.currentTime / audio.duration) * 100) + '%';
            $(progressBar).width(value);
            //progressBar.style.width = Math.floor((audio.currentTime / audio.duration) * 100) + '%';
        }
                              );

        // React to the user clicking within the progress bar
        progress.on('click', function (e) {
            var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
        audio.currentTime = pos * audio.duration;
        }
                 );
    }
}
               );

    
  





