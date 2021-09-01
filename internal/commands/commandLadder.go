package commands

import (
	"encoding/json"
	"fmt"
	"github.com/c-bec-k/discgo/pkg/data"
	"net/http"
)

func LadderReply(w http.ResponseWriter, opts map[string]interface{}) {
	embed := data.MessageEmbed{
		Title:       "The Fate Ladder",
		Color:       5027327,
		URL:         "https://fate-srd.com/fate-condensed/getting-started#the-adjective-ladder",
		Description: "+8: Legendary\n+7: Epic\n+6: Fantastic\n+5: Superb\n+4: Great\n+3: Good\n+2: Fair\n+1: Average\n+0: Mediocre\n–1: Poor\n–2: Terrible\n–3: Catastrophic\n–4: Horrifying",
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

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
