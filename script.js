const products = [
  {
    id: "alight motion",
    name: "Alight  Motion",
    brand: "Premium",
    mode: "dual",
    img: "gambar/alight motion.png",
    Sharing: [
      { label: "1 Bulan", price: 5000 },
      { label: "1 Tahun", price: 15000 },
    ],
    Private: [
      { label: "1 Bulan", price: 8000 },
      { label: "1 Tahun", price: 19000 },
    ]
  },

  {
    id: "apple music",
    name: "Apple Music",
    brand: "Premium",
    mode: "single",
    img: "gambar/apple.png",
    Sharing: [
      { label: "IMMES 1 Bulan", price: 8000 },
      { label: "IMMES 2 Bulan", price: 14000 },
      { label: "IMMES 3 Bulan", price: 21000 },
    ]
  },

   {
    id: "bstation",
    name: "Bstation",
    brand: "Premium",
    mode: "single",
    img: "gambar/bstation.png",
    Sharing: [
      { label: "1 Bulan", price: 6000 },
      { label: "2 Tahun", price: 12000 },
    ],
  },

   {
    id: "canva",
    name: "Canva",
    brand: "Premium",
    mode: "dual",
    img: "gambar/canva.png",
    Member: [
      { label: "1 Bulan", price: 5000 },
      { label: "3 Bulan", price: 10000 },
      { label: "6 Bulan", price: 15000 },
    ],
    Lifetime: [
      { label: "Lifetime", price: 20000 },
    ],
  },

  {
  id: "chatgpt",
  name: "ChatGPT",
  brand: "Premium",
  mode: "dual",
  img: "gambar/chatgpt.png",
 Sharing: [
      { label: "7 Hari", price: 9000 },
      { label: "1 Bulan", price: 16000 },
    ],
    Private: [
      { label: "1 Bulan", price: 24000 },
    ],
},

 {
  id: "disney+",
  name: "Disney+",
  brand: "Premium",
  mode: "single",
  img: "gambar/disney+.png",
 Sharing: [
      { label: "7 Hari", price: 13000 },
      { label: "1 Bulan", price: 25000 },
      { label: "2 Bulan", price: 45000 },
    ],
},

 {
  id: "getcontact",
  name: "Get Contact",
  brand: "Premium",
  mode: "SINGLE",
  img: "gambar/get contact.png",
 PRO: [
      { label: "1 Bulan", price: 15000 },
      { label: "2 Bulan", price: 27000 },
      { label: "3 Bulan", price: 37000 },
    ],
},

 {
  id: "hbomax",
  name: "HBO Max",
  brand: "Premium",
  mode: "single",
  img: "gambar/hbo max.png",
 Sharing: [
      { label: "1 Bulan", price: 12000 },
      { label: "2 Bulan", price: 24000 },
    ],
},

 {
  id: "loklok",
  name: "LokLok",
  brand: "Premium",
  mode: "single",
  img: "gambar/loklok.png",
 Sharing: [
      { label: "1 Bulan", price: 15000 },
      { label: "2 Bulan", price: 25000 },
    ],
},

 {
  id: "meitu",
  name: "Meitu",
  brand: "Premium",
  mode: "single",
  img: "gambar/meitu.png",
    Private: [
      { label: "7 Hari", price: 9000 },
      { label: "1 Bulan", price: 18000 },
    ],
},


];

const productGrid = document.getElementById("productGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const searchInput = document.getElementById("searchInput");

const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");

const mProdImg = document.getElementById("mProdImg");
const mBrand = document.getElementById("mBrand");
const mTitle = document.getElementById("mTitle");
const mDesc = document.getElementById("mDesc");

const denomGrid = document.getElementById("denomGrid");
const otherList = document.getElementById("otherList");

const chosenText = document.getElementById("chosenText");
const paketLabel = document.getElementById("paketLabel");

const tabs = document.querySelectorAll(".tab");
let currentTab = "Sharing";
let currentProduct = null;
let showCount = 10;
let chosenDenom = null;
let chosenPayment = null;

function formatIDR(n){
  return new Intl.NumberFormat("id-ID").format(n);
}

const TAB_ORDER = ["Sharing","Private","Member","IndPlan","FamPlan","Student","Lifetime","PRO"];

const TAB_LABEL = {
  Sharing: "Sharing",
  Private: "Private",
  Member: "Member",
  IndPlan: "IndPlan",
  FamPlan: "FamPlan",
  Student: "Student",
  Lifetime: "Lifetime",
  PRO: "PRO",
};


/* ===== FIX UTAMA: renderDenom ===== */
function renderDenom(prod){
  denomGrid.innerHTML = "";

  const items = prod[currentTab];

  paketLabel.textContent = (TAB_LABEL[currentTab] || currentTab).toUpperCase();

  if(!Array.isArray(items) || items.length === 0){
    denomGrid.innerHTML = `<div style="color:#64748b;font-weight:700">
      Paket tidak tersedia
    </div>`;
    return;
  }

  items.forEach(it => {
    const box = document.createElement("div");
    box.className = "denom";
    box.innerHTML = `
      <div class="denom__top">${it.label}</div>
      <div class="denom__bottom">
        <div class="cart">🛒</div>
        <div class="price">Rp${formatIDR(it.price)}</div>
      </div>
    `;

    box.addEventListener("click", () => {
      denomGrid.querySelectorAll(".denom").forEach(d =>
        d.classList.remove("active")
      );

      box.classList.add("active");

      chosenDenom = { ...it, tab: currentTab, product: prod.name };
      chosenText.textContent =
        `${prod.name} — ${it.label} (${TAB_LABEL[currentTab] || currentTab}) Rp${formatIDR(it.price)}`;
    });

    denomGrid.appendChild(box);
  });
}



function renderProducts(list){
  productGrid.innerHTML = "";
  const sliced = list.slice(0, showCount);

  sliced.forEach(p => {
    const card = document.createElement("div");
    card.className = "pcard";
    card.innerHTML = `
      <img class="pcard__img" src="${p.img}" alt="${p.name}">
      <div class="pcard__name">${p.name}</div>
      <div class="pcard__sub">${p.brand}</div>
    `;
    card.addEventListener("click", () => openProduct(p.id));
    productGrid.appendChild(card);
  });

  loadMoreBtn.style.display = list.length > showCount ? "inline-flex" : "none";
}

function renderOtherList(activeId){
  otherList.innerHTML = "";
  products
    .filter(p => p.id !== activeId)
    .slice(0, 4)
    .forEach(p => {
      const item = document.createElement("div");
      item.className = "otherItem";
      item.innerHTML = `<img src="${p.img}" alt="${p.name}"><span>${p.name}</span>`;
      item.addEventListener("click", () => openProduct(p.id));
      otherList.appendChild(item);
    });
}

function openProduct(id){
  const prod = products.find(p => p.id === id);
  if(!prod) return;

  currentProduct = prod;
  chosenDenom = null;
  chosenText.textContent = "-";

  mProdImg.src = prod.img;
  mBrand.textContent = prod.brand;
  mTitle.textContent = prod.name;
  mDesc.textContent = prod.desc || "";

  const tabWrap = document.querySelector(".tabWrap");

  // ambil paket yang BENERAN ADA
  const productTabs = TAB_ORDER.filter(
    key => Array.isArray(prod[key]) && prod[key].length
  );

  // SINGLE → ga pake tab
  if (prod.mode === "single" || productTabs.length === 1) {
    tabWrap.style.display = "none";
    currentTab = productTabs[0];
  } 
  // DUAL → tab muncul, tapi cuma yang ditag
  else {
    tabWrap.style.display = "flex";

    tabs.forEach(tab => {
      tab.style.display = productTabs.includes(tab.dataset.tab)
        ? "inline-flex"
        : "none";
    });

    currentTab = productTabs[0];
    tabs.forEach(tab =>
      tab.classList.toggle("active", tab.dataset.tab === currentTab)
    );
  }

  // 🔥🔥 INI YANG TADI HILANG 🔥🔥
  renderOtherList(prod.id);
  renderDenom(prod);

  modalOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
}



function closeProduct(){
  modalOverlay.classList.remove("show");
  document.body.style.overflow = "";
  document.body.style.position = "";
}

closeModal.addEventListener("click", closeProduct);
modalOverlay.addEventListener("click", e => {
  if(e.target === modalOverlay) closeProduct();
});

tabs.forEach(t => {
  t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    currentTab = t.dataset.tab;
    if(currentProduct) renderDenom(currentProduct);
  });
});

loadMoreBtn.addEventListener("click", () => {
  showCount += 10;
  applySearch();
});

function applySearch(){
  const q = searchInput.value.toLowerCase().trim();
  renderProducts(products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q)
  ));
}

searchInput.addEventListener("input", applySearch);

/* PAYMENT */
document.querySelectorAll(".payItem").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".payItem").forEach(p => {
      p.classList.remove("active");
      const c = p.querySelector(".check");
      if(c) c.remove();
    });

    item.classList.add("active");
    chosenPayment = item.innerText.trim();

    const check = document.createElement("div");
    check.className = "check";
    check.textContent = "✓";
    item.appendChild(check);
  });
});

/* CHECKOUT (WA) */
document.getElementById("btnCheckout").addEventListener("click", () => {
  const name = document.getElementById("inpName").value.trim();
  const phone = document.getElementById("inpPhone").value.trim();
  const email = document.getElementById("inpEmail").value.trim();

  if(!name || !phone || !email) return alert("Lengkapi data dulu.");
  if(!chosenDenom) return alert("Pilih paket dulu.");
  if(!chosenPayment) return alert("Pilih metode pembayaran.");

  const msg = `Halo admin, saya mau order:

Nama: ${name}
No HP: ${phone}
Email: ${email}

Produk: ${chosenDenom.product}
Paket: ${chosenDenom.label}
Harga: Rp${formatIDR(chosenDenom.price)}
Pembayaran: ${chosenPayment}`;

  window.open(
    `https://wa.me/62895377505030?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
});

/* INIT */
renderProducts(products);
