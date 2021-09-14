package commands

import (
	"encoding/json"
	"fmt"
	"github.com/c-bec-k/fateBot/pkg/data"
	"net/http"
)

func InviteReply2(w http.ResponseWriter, opts map[string]interface{}) {
	reply := data.InteractionResponse{
		Type: data.ChannelMessageWithSourceCallback,
		Data: data.InteractionCallbackData{
			Content: "[You can invite the bot with this link!](<https://discord.com/api/oauth2/authorize?client_id=763485934028718110&permissions=0&scope=bot%20applications.commands>)",
		},
	}

	js, err := json.Marshal(reply)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Printf("%+v", string(js))
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func InviteReply(w http.ResponseWriter, opts map[string]interface{}) {
	embed := data.MessageEmbed{
		Title: "About FateBot",
		Type:  data.EmbedRichType,
		Color: 5027327,
		Thumbnail: data.EmbedThumbnail{URL: "https://cdn.discordapp.com/app-icons/763485934028718110/9e00c65e5bd770fb86df24e3a2359277.png"},
		Fields: []data.EmbedField{
			{Name: "Version", Value: "1.0.0"},
			{Name: "Invite To Another Server", Value: "[Click here to invite](<https://discord.com/api/oauth2/authorize?client_id=763485934028718110&permissions=0&scope=bot%20applications.commands>)"},
		},
	}
	reply := data.InteractionResponse{
		Type: data.ChannelMessageWithSourceCallback,
		Data: data.InteractionCallbackData{
			Embeds: []data.MessageEmbed{embed},
		},
	}
	js, err := json.Marshal(reply)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Printf("%+v", string(js))
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)

}
