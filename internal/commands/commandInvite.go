package commands

import (
	"encoding/json"
	"fmt"
	"github.com/c-bec-k/discgo/pkg/data"
	"net/http"
)

func InviteReply(w http.ResponseWriter, opts map[string]interface{}) {
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
