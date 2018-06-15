class tabPanel {
  constructor(id, config){
    document.head.innerHTML+=`<style>
      .tabpanel {
        list-style: none;
        background-color: #F7F7F7;
        border: solid 1px #E4E4E4;
        overflow: scroll;
        padding: 0px;
        margin-bottom: 0px;
        cursor: pointer;
      }

      .tabpanel-item {
        white-space: nowrap;
        padding: 10px;
      }

      .tabpanel-item-active {
        background-color: #E4E4E4;
      }

      .tabpanel-content {
        float: right;
      }
    </style>`
    if('attributes' in config){
      this.attributes = config['attributes'];
    } else {
      this.attributes = {};
    }
    let ata = this;
    this.id = id;
    this.attributes['id'] = this.id;
    window[this.id] = this;
    if('class' in this.attributes){
      this.attributes['class'] = "tabpanel "+this.attributes['class'];
    } else {
      this.attributes['class'] = "tabpanel";
    }
    this.items = config['items'];

    let item;
    for(item in this.items){
      this.items[item].id = "tabpanel-"+this.id+"-"+this.items[item].id;
    }

    let attrstring = "";
    Object.keys(this.attributes).forEach(function(el, index, array){
      attrstring += el+'="'+ata.attributes[el]+'"';
    })
    document.getElementById("container-"+this.id).innerHTML = '<ul '+attrstring+'> </ul>\n'+document.getElementById("container-"+this.id).innerHTML;

    this.items.forEach(function(item, index, array){
      document.getElementById(ata.id).innerHTML += '\n<li id="'+item['id']+'"onclick="window[\''+ata.id+'\'].select(this.id)" class="tabpanel-item">\n'+item['title']+"\n</li>";
      document.getElementById(item.id+"-content").style.display = "none";
    })
    this.select(this.items[0].id);

  }

  select(id){
    if(this.selected){
      document.getElementById(this.selected).classList.remove("tabpanel-item-active")
      document.getElementById(this.selected+"-content").style.display = "none";
    }
    this.selected = id;
    document.getElementById(id).classList.add("tabpanel-item-active");
    document.getElementById(this.selected+"-content").style.display = "block";
    try{
      let item;
      for(item in this.items){
        if(this.items[item].id == id){
          if('onclick' in this.items[item]){
            eval(this.items[item].onclick);
          }
        }
      }
    }catch(ex){
      console.log(ex.message);
    }
  }
}
