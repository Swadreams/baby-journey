(function () {
  const playlists = typeof window !== "undefined" ? window.YOUTUBE_PLAYLISTS : null;

  function thumbUrl(videoId) {
    return "https://i.ytimg.com/vi/" + encodeURIComponent(videoId) + "/mqdefault.jpg";
  }

  function embedSrc(videoId, listId) {
    return (
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(videoId) +
      "?list=" +
      encodeURIComponent(listId) +
      "&rel=0&fs=1"
    );
  }

  function setActiveTrack(root, activeBtn) {
    root.querySelectorAll(".embed__track").forEach(function (btn) {
      btn.classList.remove("embed__track--active");
      btn.removeAttribute("aria-current");
    });
    activeBtn.classList.add("embed__track--active");
    activeBtn.setAttribute("aria-current", "true");
  }

  function initEmbed(root) {
    const listId = root.getAttribute("data-playlist-id");
    if (!listId || !playlists || !Object.prototype.hasOwnProperty.call(playlists, listId)) {
      return;
    }

    const videos = playlists[listId];
    if (!videos || !videos.length) {
      return;
    }

    const iframe = root.querySelector("iframe");
    const ul = root.querySelector(".embed__tracklist");
    const sidebar = root.querySelector(".embed__sidebar");
    if (!iframe || !ul || !sidebar) {
      return;
    }

    root.classList.add("embed--with-sidebar");
    sidebar.removeAttribute("hidden");

    iframe.setAttribute("src", embedSrc(videos[0].id, listId));
    iframe.removeAttribute("tabindex");

    ul.replaceChildren();

    videos.forEach(function (item, index) {
      const li = document.createElement("li");
      li.className = "embed__tracklist-item";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "embed__track";
      if (index === 0) {
        btn.classList.add("embed__track--active");
        btn.setAttribute("aria-current", "true");
      }

      const img = document.createElement("img");
      img.className = "embed__track-thumb";
      img.alt = "";
      img.width = 320;
      img.height = 180;
      img.loading = "lazy";
      img.decoding = "async";
      img.src = thumbUrl(item.id);

      const span = document.createElement("span");
      span.className = "embed__track-title";
      span.textContent = item.title;

      btn.appendChild(img);
      btn.appendChild(span);

      btn.addEventListener("click", function () {
        iframe.setAttribute("src", embedSrc(item.id, listId));
        setActiveTrack(root, btn);
      });

      li.appendChild(btn);
      ul.appendChild(li);
    });
  }

  function run() {
    document.querySelectorAll(".embed.embed--playlist[data-playlist-id]").forEach(initEmbed);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
