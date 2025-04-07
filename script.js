// GSAPの初期化
gsap.registerPlugin(ScrollTrigger);

// ハンバーガーメニューの動作
document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector("nav").classList.toggle("active");
});

// ページ読み込み時のアニメーション
window.addEventListener("load", function () {
  // メインビジュアルテキストのアニメーション
  gsap.to(".visual-text", {
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.5,
  });

  // スクロールトリガーのセットアップ
  setupScrollAnimations();

  // 水玉アニメーションの生成
  createBubbles();
});

// スクロールアニメーションの設定
function setupScrollAnimations() {
  // フェードインアニメーション（共通）
  gsap.utils.toArray(".fade-in").forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          markers: false,
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  });

  // お知らせアイテムのアニメーション
  gsap.utils.toArray(".news-item").forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        opacity: 0,
        y: 30,
      },
      {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
      }
    );
  });

  // 教育方針セクションのアニメーション
  gsap.fromTo(
    ".philosophy-text",
    {
      opacity: 0,
      y: 30,
    },
    {
      scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }
  );

  gsap.fromTo(
    ".philosophy-image",
    {
      opacity: 0,
      y: 30,
    },
    {
      scrollTrigger: {
        trigger: ".philosophy-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }
  );

  // 園児募集のボックスアニメーション
  gsap.fromTo(
    ".info-box",
    {
      opacity: 0,
      y: 30,
    },
    {
      scrollTrigger: {
        trigger: ".recruitment-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }
  );
}

// 水玉アニメーションの作成
function createBubbles() {
  const bubblesContainer = [
    document.querySelector(".news-section"),
    document.querySelector(".philosophy-section"),
    document.querySelector(".recruitment-section"),
  ];

  bubblesContainer.forEach((container) => {
    if (!container) return;

    // コンテナごとの水玉の色設定
    let colors;
    if (container.classList.contains("philosophy-section")) {
      colors = [
        "rgba(255, 182, 193, 0.5)",
        "rgba(156, 29, 34, 0.3)",
        "rgba(255, 218, 224, 0.6)",
      ];
    } else {
      colors = [
        "rgba(255, 192, 203, 0.4)",
        "rgba(156, 29, 34, 0.2)",
        "rgba(255, 228, 225, 0.5)",
      ];
    }

    // 各コンテナに10-15個の水玉を追加
    const bubbleCount = Math.floor(Math.random() * 6) + 10;

    for (let i = 0; i < bubbleCount; i++) {
      const size = Math.floor(Math.random() * 80) + 20; // 20px〜100px
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");

      // 水玉のスタイル設定
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      // コンテナ内のランダムな位置
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const left = Math.random() * (containerWidth - size);
      const top = Math.random() * (containerHeight - size);
      bubble.style.left = `${left}px`;
      bubble.style.top = `${top}px`;

      // コンテナに追加
      container.appendChild(bubble);

      // GSAPでアニメーション
      gsap.fromTo(
        bubble,
        {
          opacity: 0,
          scale: 0,
        },
        {
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0.6,
          scale: 1,
          duration: 1 + Math.random(),
          delay: Math.random() * 0.8,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // ふわふわ浮遊アニメーション
      gsap.to(bubble, {
        y: `-=${20 + Math.random() * 30}`,
        x: `+=${Math.random() * 20 - 10}`,
        duration: 2 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  });
}
