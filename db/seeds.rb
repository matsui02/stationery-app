# db/seeds.rb

# ===== ユーザー =====
users = [
  { name: "山田 太郎", email: "taro@example.com",    bio: "文房具が大好きなデザイナーです。" },
  { name: "佐藤 花子", email: "hanako@example.com",  bio: "手帳とペンを集めています。" },
  { name: "田中 健太", email: "kenta@example.com",   bio: "万年筆沼にはまっています。" },
  { name: "鈴木 あい", email: "ai@example.com",      bio: "シンプルな文房具が好きです。" },
  { name: "伊藤 誠",   email: "makoto@example.com",  bio: "勉強用の文房具を探しています。" },
].map do |attrs|
  User.find_or_create_by!(email: attrs[:email]) do |u|
    u.name     = attrs[:name]
    u.bio      = attrs[:bio]
    u.password = "password123"
  end
end

puts "ユーザー作成完了: #{User.count}件"

# ===== カテゴリ =====
categories = [
  "ボールペン", "シャープペン", "万年筆",
  "マーカー", "消しゴム", "ノート", "定規", "その他"
].map { |name| Category.find_or_create_by!(name: name) }

# ===== ブランド =====
brands = [
  "PILOT", "LAMY", "Pentel", "uni", "ZEBRA",
  "Staedtler", "Faber-Castell", "RHODIA", "Kokuyo", "MUJI"
].map { |name| Brand.find_or_create_by!(name: name) }

puts "ブランド作成完了: #{Brand.count}件"

# ===== アイテム =====
item_data = [
  { name: "フリクションボールノック", brand: "PILOT",   category: "ボールペン",  price: 220  },
  { name: "ジュースアップ",           brand: "PILOT",   category: "ボールペン",  price: 165  },
  { name: "Safari ボールペン",        brand: "LAMY",    category: "ボールペン",  price: 3300 },
  { name: "グラフ1000",              brand: "Pentel",  category: "シャープペン", price: 770  },
  { name: "クルトガ",                 brand: "uni",     category: "シャープペン", price: 550  },
  { name: "Safari 万年筆",           brand: "LAMY",    category: "万年筆",      price: 4400 },
  { name: "マイルドライナー",         brand: "ZEBRA",   category: "マーカー",    price: 110  },
  { name: "キャンパスノート",         brand: "Kokuyo",  category: "ノート",      price: 165  },
  { name: "ドット罫ノート",           brand: "RHODIA",  category: "ノート",      price: 660  },
  { name: "カドケシ",                brand: "PILOT",   category: "消しゴム",    price: 165  },
]

items = item_data.map do |attrs|
  brand    = Brand.find_by!(name: attrs[:brand])
  category = Category.find_by!(name: attrs[:category])
  Item.find_or_create_by!(name: attrs[:name], brand: brand, category: category) do |i|
    i.price = attrs[:price]
  end
end

puts "アイテム作成完了: #{Item.count}件"

# ===== 筆箱投稿 =====
pencil_case_data = [
  {
    user:    users[0],
    title:   "毎日持ち歩くシンプル筆箱",
    concept: "必要最低限のものだけ入れたシンプルな構成。LAMYのボールペンがお気に入りです。",
    items:   [
      { name: "Safari ボールペン",  brand: "LAMY",   category: "ボールペン"  },
      { name: "グラフ1000",        brand: "Pentel", category: "シャープペン" },
      { name: "キャンパスノート",   brand: "Kokuyo", category: "ノート"      },
    ]
  },
  {
    user:    users[1],
    title:   "手帳と一緒に使う文房具セット",
    concept: "手帳に合わせて選んだ文房具たち。マイルドライナーで色分けするのが好きです。",
    items:   [
      { name: "マイルドライナー",          brand: "ZEBRA",  category: "マーカー"    },
      { name: "フリクションボールノック",   brand: "PILOT",  category: "ボールペン"  },
      { name: "ドット罫ノート",            brand: "RHODIA", category: "ノート"      },
    ]
  },
  {
    user:    users[2],
    title:   "万年筆メインの大人な筆箱",
    concept: "LAMYの万年筆を中心に揃えました。書き心地にこだわっています。",
    items:   [
      { name: "Safari 万年筆",    brand: "LAMY",  category: "万年筆"      },
      { name: "ドット罫ノート",   brand: "RHODIA", category: "ノート"      },
      { name: "カドケシ",        brand: "PILOT",  category: "消しゴム"    },
    ]
  },
  {
    user:    users[3],
    title:   "受験生の勉強用筆箱",
    concept: "勉強に特化した構成。クルトガとジュースアップの組み合わせが最高です。",
    items:   [
      { name: "クルトガ",        brand: "uni",   category: "シャープペン" },
      { name: "ジュースアップ",  brand: "PILOT", category: "ボールペン"  },
      { name: "カドケシ",       brand: "PILOT", category: "消しゴム"    },
    ]
  },
  {
    user:    users[4],
    title:   "デスクに置きたいこだわり筆箱",
    concept: "デスクワーク用に揃えた文房具。毎日使うものだからこそ品質にこだわりました。",
    items:   [
      { name: "Safari ボールペン", brand: "LAMY",   category: "ボールペン"  },
      { name: "グラフ1000",       brand: "Pentel", category: "シャープペン" },
      { name: "マイルドライナー",  brand: "ZEBRA",  category: "マーカー"    },
      { name: "キャンパスノート",  brand: "Kokuyo", category: "ノート"      },
    ]
  },
]

pencil_case_data.each do |attrs|
  pencil_case = PencilCase.find_or_create_by!(
    title: attrs[:title],
    user:  attrs[:user]
  ) do |pc|
    pc.concept = attrs[:concept]
  end

  attrs[:items].each do |item_attrs|
    brand    = Brand.find_by!(name: item_attrs[:brand])
    category = Category.find_by!(name: item_attrs[:category])
    item     = Item.find_by!(name: item_attrs[:name], brand: brand, category: category)

    PencilCaseItem.find_or_create_by!(
      pencil_case: pencil_case,
      item:        item
    )
  end
end

puts "筆箱投稿作成完了: #{PencilCase.count}件"

# ===== いいね（ランキング用） =====
# Like モデルのカラムを確認してから追加
if defined?(Like)
  like_data = [
    { user: users[1], target: PencilCase.find_by(title: "毎日持ち歩くシンプル筆箱") },
    { user: users[2], target: PencilCase.find_by(title: "毎日持ち歩くシンプル筆箱") },
    { user: users[3], target: PencilCase.find_by(title: "毎日持ち歩くシンプル筆箱") },
    { user: users[0], target: PencilCase.find_by(title: "手帳と一緒に使う文房具セット") },
    { user: users[2], target: PencilCase.find_by(title: "手帳と一緒に使う文房具セット") },
    { user: users[0], target: PencilCase.find_by(title: "万年筆メインの大人な筆箱") },
    { user: users[1], target: PencilCase.find_by(title: "万年筆メインの大人な筆箱") },
    { user: users[3], target: PencilCase.find_by(title: "万年筆メインの大人な筆箱") },
    { user: users[4], target: PencilCase.find_by(title: "万年筆メインの大人な筆箱") },
    { user: users[0], target: PencilCase.find_by(title: "受験生の勉強用筆箱") },
    { user: users[1], target: PencilCase.find_by(title: "デスクに置きたいこだわり筆箱") },
    { user: users[2], target: PencilCase.find_by(title: "デスクに置きたいこだわり筆箱") },
  ]

  like_data.each do |attrs|
    next unless attrs[:target]
    Like.find_or_create_by!(
      user:     attrs[:user],
      likeable: attrs[:target]
    )
  end

  puts "いいね作成完了: #{Like.count}件"
end

puts "=== Seed完了 ==="
puts "ユーザー: #{User.count}件"
puts "筆箱投稿: #{PencilCase.count}件"
puts "アイテム: #{Item.count}件"
puts "いいね:   #{Like.count}件"
