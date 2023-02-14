$("#container").tabs();

$("#container").on("click","input[type=checkbox]",function(){
    $(this).closest("li").slideUp(function(){
        $(this).remove();
        
    });
});

$("#container").on("click",".ui-icon-circle-close",function(){
    $(this).closest("li").slideUp();
       let index= $(this).closest("li").index();
        let id=$("#main li:eq("+ index +") a").attr("href");
           $(id).remove();
            $(this).remove();
            console.log(id);
            $("#container").tabs("refresh"); 
});

$("ul").sortable({axis:"x",containment:"#container"});

$("ol").sortable({axis:"y",containment:"#container"});
$("#btnProject").button();
$("#btnTask").button();
$("#btnProject").click(function(){
    $("#dialog-box").dialog({
        width:400,
        resizable:false,
        modal:true,
        buttons: {
            "Add project":function(){
                let tabValue=$("#new-tab").val();
                let newTab=tabValue.split(" ").join("_");
                $("<li><a href='#"+newTab+"'>"+tabValue+"</a><span class='ui-icon ui-icon-circle-close'></span> </li>").appendTo("#main");
              let ol= $(" <ol id='"+newTab+"'></ol>");
              ol.appendTo("#container");
                $("#container").tabs("refresh");
                let tabCount=$("#container .ui-tabs-nav li").length;
                $("#container").tabs("option","active",tabCount-1);

                $("#new-tab").val("");
                $(this).dialog("close");
            },
            "Cancel":function(){
                $("#new-tab").val("");
                $("#dialog-box").dialog("close");
            },

        }
        
    });
   
});

$("#btnTask").click(function(){
    console.log("clicked");
   $("#taskDialog").dialog({
        width:400,
        resizable:false,
        modal:true,
        buttons:{
        "Add Task": function(){
            $("#container").tabs("refresh");
           let activeTab= $("#container").tabs("option","active");
                let taskValue=$("#new-task").val();
                let tab_id=$("#container #main >li:nth-child("+(activeTab+1)+")> a").attr("href");
            let li=$("<li><input type='checkbox'>"+taskValue+"</li>");
                li.appendTo("#container ol"+tab_id);
                $("#container ol").sortable({axis:"y",containment:"#container"});
                $("#new-task").val("");
                $("#taskDialog").dialog("close");
            },
           "Cancel":function(){
            $("#new-task").val("");
            $("#taskDialog").dialog("close");
           }
           }
        });
   
});