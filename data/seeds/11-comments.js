exports.seed = function(knex, Promise) {
  return knex("comments").insert([
    {
      user_id: 1,
      post_id: 1,
      comment:
        "Ronaldo has been the best player for years and has turned many an Arsenal player inside out. The 45 million your club gave for transfer is laughable even newcastle have beaten you spending",
    },
    {
      user_id: 1,
      post_id: 2,
      comment:
        "I’m an arsenal fan and as much as I’d like to try and call him unremarkable for his last few seasons as Man U, it’s literally laughable",
    },
    {
      user_id: 1,
      post_id: 3,
      comment:
        "Yeah sounds like a plan. Madrid get an unwanted, ageing, injury prone winger on a massive salary who nobody wants to gamble on buying off their books and replace him with...United's unwanted, ageing, injury prone winger on a massive salary who nobody wants to risk buying, leaving both clubs right back at square one. It's genius! I wonder why Ed Woodward and Florentino Perez haven't thought of it yet?",
    },
    {
      user_id: 2,
      post_id: 1,
      comment:
        "They can stay at their clubs and earn 45 mil for the next 3 years because nobody else can deal for them in Europe or the clubs can gamble that a swap and new environment gets something out of them (we're talking about players who at their peak are elite level) and some return on the 45 mil they will pay them for the next 3 years. I'd guess Ed and Perez never broached it, they both hoped to find a loan arrangement or buyer but very unlikely on their wages",
    },
    {
      user_id: 2,
      post_id: 2,
      comment:
        "No actually, both are trying to offload them to China because its the only place where the clubs might be mad enough to spend potentially half a million euro a week to a guy who will probably only play half the games and will be finished in two years time. ",
    },
    {
      user_id: 2,
      post_id: 3,
      comment:
        "man city are the new PSG they are going to keep wining the league I think Zidane is hoping to swap him and modric and a few quid for Naymar Rather than let him go to barca",
    },
    {
      user_id: 3,
      post_id: 1,
      comment:
        "Even if City could get Bale on a free, they still couldnt do his wages without so much financial manipulation that UEFA could no longer hide their conflict of interest and be forced into issuing actual punishment.",
    },
    {
      user_id: 3,
      post_id: 2,
      comment:
        "Kind of convenient he says he refused to play when at the same time saying it would be best if he leaves the club in next 24 or 48 hours! Do you believe Zidane in the circumstances?",
    },
    {
      user_id: 3,
      post_id: 3,
      comment:
        "Past his best, if he is that serious about playing high level football he should be sensible and take a massive paycut, if it's just about money, then buzz off to China, if that's his attitude.",
    },
    {
      user_id: 1,
      post_id: 4,
      comment:
        "Six years in Spain, does not speak Spanish, is prone to injuries( physios have said it is genetic) and has been nowhere near on the level of Ronaldo or any other Madrid great. He is hyped up because he is British. Sell him to whoever because his time at Madrid is up.",
    },
    {
      user_id: 1,
      post_id: 5,
      comment:
        "He was a fantastic player with more pace than you could dream of, he has not been used in positions that are suited to his ability. He started life as a full back come wing back, but his Real Madrid managers wanted another Ronaldo which he was not, and wanted him playing up front, and hoped he would score the goals that would keep them in their jobs.",
    },
    {
      user_id: 1,
      post_id: 6,
      comment:
        "He should smile, do his training, but his kit on, sit on the subs bench, and then stick two fingers up at those in charge each week he picks up his enormous wages.",
    },
  ]);
};
