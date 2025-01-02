// Função para extrair o ID do vídeo do YouTube da URL
function getYouTubeVideoId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Função para criar a URL da miniatura
function getYouTubeThumbnailUrl(videoId) {
  return `http://img.youtube.com/vi/${videoId}/0.jpg`;
}

// Função para iniciar o contador regressivo
function startCountdown(seconds, redirectUrl) {
  let counter = seconds;
  const countdownElement = document.getElementById('countdown');

  const interval = setInterval(() => {
    countdownElement.textContent = `Aguarde, estamos te levando para assistir no YouTube em ${counter} segundos...`;
    counter--;

    if (counter < 0) {
      clearInterval(interval);
      window.location.href = redirectUrl;
    }
  }, 1000);
}

// Obtendo a URL do vídeo do parâmetro da URL
const urlParams = new URLSearchParams(window.location.search);


  let videoUrl = urlParams.get('video');


// Validando a URL e extraindo o ID do vídeo
if (videoUrl) {
  const videoId = getYouTubeVideoId(videoUrl);

  if (videoId) {
    const thumbnailUrl = getYouTubeThumbnailUrl(videoId);

    // Atualizando o HTML com a miniatura, mensagem e contador
    const thumbnailElement = document.getElementById('thumbnail');
    thumbnailElement.src = thumbnailUrl;

    startCountdown(10, videoUrl);
  } else {
    console.error('URL do YouTube inválida');
  }
} else {
  console.error('Parâmetro "video" não encontrado na URL');
}
