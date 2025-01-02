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
function preencherMetaTagsYouTube(videoId) {
  const apiKey = 'AIzaSyCamz33adD2c_cSenIF85h1WiQCanF2jsc'; // Substitua pela sua chave da API
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const video = data.items[0];
      const titulo = video.snippet.title;
      const descricao = video.snippet.description;
      const thumbnail = video.snippet.thumbnails.default.url;

      document.querySelector('meta[property="og:title"]').content = titulo;
      document.querySelector('meta[property="og:description"]').content = descricao;
      document.querySelector('meta[property="og:image"]').content = thumbnail;
    })
    .catch(error => {
      console.error('Erro ao buscar informações do vídeo:', error);
    });

    preencherMetaTagsYouTube()
}
