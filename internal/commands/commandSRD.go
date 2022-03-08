package commands

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/c-bec-k/fateBot/pkg/data"
)

func SRDreply(w http.ResponseWriter, opts map[string]interface{}) {

	coreRules := []data.Component{
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Fate Core", URL: "https://fate-srd.com/fate-core"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Fate Accelerated", URL: "https://fate-srd.com/fate-accelerated"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Fate Condensed", URL: "https://fate-srd.com/fate-condensed"},
	}

	toolkits := []data.Component{
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Fate System Toolkit", URL: "https://fate-srd.com/fate-system-toolkit"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Fate Adversary Toolkit", URL: "https://fate-srd.com/fate-adversary-toolkit"},
	}

	fateWorlds := []data.Component{
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Atomic Robo", URL: "https://fate-srd.com/atomic-robo"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Venture City", URL: "https://fate-srd.com/venture-city"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "War of Ashes", URL: "https://fate-srd.com/war-of-ashes"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "#iHunt", URL: "https://fate-srd.com/ihunt"},
	}

	worldsOfAdventure := []data.Component{
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Frontier Spirit", URL: "https://fate-srd.com/frontier-spirit"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Gods and Monsters", URL: "https://fate-srd.com/gods-and-monsters"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Frontier Spirit", URL: "https://fate-srd.com/frontier-spirit"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Sails Full of Stars", URL: "https://fate-srd.com/sails-full-of-stars"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Three Rocketeers", URL: "https://fate-srd.com/three-rocketeers"},
	}

	fateCodex := []data.Component{
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Fate Codex, Volume 1", URL: "https://fate-srd.com/fate-codex/fate-codex-volume-1"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Fate Codex, Volume 2", URL: "https://fate-srd.com/fate-codex/fate-codex-volume-2"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Fate Codex, Volume 3", URL: "https://fate-srd.com/fate-codex/fate-codex-volume-3"},
		data.LinkButton{Type: 2, Style: data.LinkButtonStyle, Label: "Odds & Ends", URL: "https://fate-srd.com/odds-and-ends"},
	}

	ar1 := data.ActionRow{
		Type:       data.ActionRowComponent,
		Components: coreRules,
	}

	ar2 := data.ActionRow{
		Type:       data.ActionRowComponent,
		Components: toolkits,
	}
	ar3 := data.ActionRow{
		Type:       data.ActionRowComponent,
		Components: fateWorlds,
	}
	ar4 := data.ActionRow{
		Type:       data.ActionRowComponent,
		Components: worldsOfAdventure,
	}
	ar5 := data.ActionRow{
		Type:       data.ActionRowComponent,
		Components: fateCodex,
	}

	reply := data.InteractionResponse{
		Type: data.ChannelMessageWithSourceCallback,
		Data: data.InteractionCallbackData{
			Content: "Links to the Fate SRD",
			Components: []data.ActionRow{
				ar1, ar2, ar3, ar4, ar5,
			},
		},
	}

	//fmt.Printf("Reply sent: %+v\n", reply)

	js, err := json.Marshal(reply)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
