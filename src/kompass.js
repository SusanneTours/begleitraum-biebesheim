
// ---------- Gefühlskompass ----------
(function(){
  const EMOS = {
    wut:{name:"Wut", color:"#6F01F5",
      info:"Wut zeigt dir: Ein Wert oder eine Grenze ist verletzt.",
      need:"Respekt, Fairness, klare Grenzen",
      q:["Welcher Wert ist hier verletzt?","Welche Grenze will ich deutlich machen?"],
      auto:"Angreifen, rechtfertigen, recht haben wollen.",
      tip:"Benenne den Wert, nicht den Vorwurf. „Mir ist Verlässlichkeit wichtig“ statt „Du bist unzuverlässig“."},
    angst:{name:"Angst", color:"#190333",
      info:"Angst zeigt dir: Du brauchst Sicherheit.",
      need:"Sicherheit, Vorhersehbarkeit, Halt",
      q:["Wovor genau habe ich Angst?","Was brauche ich, um mich sicherer zu fühlen?"],
      auto:"Vermeiden, aufschieben, um den heißen Brei reden.",
      tip:"Mach die Befürchtung konkret. Oft ist das Schlimmste, was passieren kann, kleiner als das Gefühl davor."},
    trauer:{name:"Trauer", color:"#5A6B8C",
      info:"Trauer zeigt dir: Du hast etwas verloren oder dir etwas anders erhofft.",
      need:"Abschied nehmen, Verbundenheit, Anerkennung",
      q:["Was enttäuscht mich?","Was muss ich loslassen?"],
      auto:"Rückzug, resignieren, „bringt ja eh nichts“.",
      tip:"Erlaube dir den Abschied, zum Beispiel von einer alten Rolle. Dann wird der Blick frei für das, was jetzt möglich ist."},
    scham:{name:"Scham", color:"#A05CFF",
      info:"Scham zeigt dir: Dein Selbstwert oder deine Zugehörigkeit fühlt sich bedroht an.",
      need:"Selbstwert, Zugehörigkeit, Anerkennung",
      q:["Was ist mir unangenehm und vor wem?","Was hätte ich gern, dass andere über mich denken?"],
      auto:"Verstecken, kleinreden oder überperfekt sein wollen.",
      tip:"Fehlbarkeit zeigen schafft Vertrauen. Ein offenes „Das hätte ich früher ansprechen sollen“ wirkt stärker als jede Fassade."},
    freude:{name:"Freude", color:"#2E9D5B",
      info:"Freude zeigt dir, was dich lebendig macht und was dir an der Beziehung wichtig ist.",
      need:"Lebendigkeit, Sinn, Verbundenheit",
      q:["Wofür bin ich in dieser Situation dankbar?","Was gibt mir hier Kraft?"],
      auto:"Schönreden, das Problem überspielen.",
      tip:"Nutze Freude als Kraftquelle. Was du an deinem Gegenüber schätzt, darf im Gespräch hörbar werden."}
  };
  const ORDER=["wut","angst","trauer","scham","freude"];
  const ITEMS=[
    ["wut","Es ärgert mich, wie hier mit mir oder anderen umgegangen wird."],
    ["angst","Ich mache mir Sorgen, wie das Gespräch ausgeht."],
    ["scham","Mir ist unangenehm, dass ich die Situation nicht schon früher angesprochen habe."],
    ["trauer","Ich bin enttäuscht, weil ich mir etwas anderes erhofft hatte."],
    ["freude","Mir ist wichtig, dass es mit dieser Person gut weitergeht."],
    ["wut","Ich habe das Gefühl, dass etwas, das mir wichtig ist, missachtet wird."],
    ["angst","Ich befürchte, dass die Beziehung leidet, wenn ich es anspreche."],
    ["scham","Ich frage mich, was andere von mir als Führungskraft denken."],
    ["trauer","Ich vermisse etwas, das früher anders war."],
    ["freude","Ich sehe in der Situation auch eine Chance."],
    ["wut","Wenn ich an die Situation denke, spannt sich mein Körper an."],
    ["angst","Ich spiele vorher im Kopf durch, wie mein Gegenüber reagieren könnte."],
    ["scham","Ich habe Sorge, nicht mehr richtig dazuzugehören."],
    ["trauer","Ich spüre, dass ich mich von einer Vorstellung verabschieden muss."],
    ["freude","Es gibt etwas, das ich an dieser Person wirklich schätze."]
  ];
  const box=document.getElementById("gkItems"); if(!box) return;
  const ans=new Array(ITEMS.length).fill(null);
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  ITEMS.forEach(([,t],i)=>{
    const d=document.createElement("div"); d.className="gk-item";
    d.innerHTML='<div class="gk-t">'+(i+1)+'. '+esc(t)+'</div><div class="gk-scale">'+[0,1,2,3,4].map(v=>'<button type="button" data-i="'+i+'" data-v="'+v+'">'+v+'</button>').join("")+'</div>';
    box.appendChild(d);
  });
  box.addEventListener("click",e=>{const b=e.target.closest("button"); if(!b) return;
    ans[+b.dataset.i]=+b.dataset.v; b.parentElement.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));});
  const bar=(k,v)=>'<div class="gk-bar"><span>'+EMOS[k].name+'</span><div class="gk-track"><div style="width:'+(v/12*100)+'%;background:'+EMOS[k].color+'"></div></div><b>'+v+'</b></div>';
  const detail=k=>{const e=EMOS[k]; return '<div class="card"><span class="eyebrow" style="color:'+e.color+'">'+e.name+'</span><h3>'+esc(e.info)+'</h3>'+
    '<p><b>Was du brauchst:</b> '+esc(e.need)+'</p><p><b>Frag dich:</b></p><ul class="clean">'+e.q.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>'+
    '<p><b>Dein typischer Autopilot:</b> '+esc(e.auto)+'</p><p style="margin-bottom:0"><b>Tipp fürs Gespräch:</b> '+esc(e.tip)+'</p></div>';};
  document.getElementById("gkGo").addEventListener("click",()=>{
    const hint=document.getElementById("gkHint");
    if(ans.some(a=>a===null)){hint.style.display="block"; return;} hint.style.display="none";
    const s={}; ORDER.forEach(k=>s[k]=0); ITEMS.forEach(([k],i)=>s[k]+=ans[i]);
    const sit=document.getElementById("gkSit").value.trim(), so=document.getElementById("gkSitOut");
    if(sit){so.style.display="block"; so.innerHTML='<span class="eyebrow">Deine Situation</span><p style="margin:0">'+esc(sit)+'</p>';} else so.style.display="none";
    document.getElementById("gkBars").innerHTML='<h3>Deine Gefühle in dieser Situation</h3>'+ORDER.map(k=>bar(k,s[k])).join("");
    const heavy=["wut","angst","trauer","scham"].filter(k=>s[k]>0).sort((a,b)=>s[b]-s[a]).slice(0,2);
    document.getElementById("gkTop").innerHTML=heavy.length?'<h3 class="sec">Was am stärksten mitschwingt</h3>'+heavy.map(detail).join(""):'<div class="card"><p style="margin:0">Belastende Gefühle spielen gerade kaum eine Rolle. Gute Voraussetzungen für das Gespräch.</p></div>';
    const f=EMOS.freude;
    document.getElementById("gkJoy").innerHTML='<span class="eyebrow">Deine Kraftquelle</span><h3>Freude: '+s.freude+' von 12</h3><p>'+esc(f.info)+'</p><ul class="clean">'+f.q.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul><p style="margin:0">'+esc(f.tip)+'</p>';
    const r=document.getElementById("gkRes"); r.style.display="block"; r.scrollIntoView({behavior:"smooth"});
  });
  document.getElementById("gkPrint").addEventListener("click",()=>{
    const pa=document.getElementById("print-area"); if(!pa){window.print();return;}
    pa.innerHTML='<h2>Mein Gefühlskompass</h2>'+document.getElementById("gkSitOut").outerHTML+document.getElementById("gkBars").outerHTML+document.getElementById("gkTop").innerHTML+document.getElementById("gkJoy").outerHTML+'<p style="margin-top:12px;color:#666">Nach Christiane Windhausen und Tobias Grewe (Brave Dialogue Process)</p>';
    document.body.classList.add("printing"); window.print();
    setTimeout(()=>document.body.classList.remove("printing"),500);
  });
  document.getElementById("gkReset").addEventListener("click",()=>{ans.fill(null); box.querySelectorAll("button.on").forEach(b=>b.classList.remove("on"));
    document.getElementById("gkSit").value=""; document.getElementById("gkRes").style.display="none"; window.scrollTo({top:0});});
})();
