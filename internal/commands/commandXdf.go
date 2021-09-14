package commands

import (
	"encoding/json"
	"fmt"
	"github.com/c-bec-k/fateBot/pkg/data"
	"net/http"
	"strconv"
	"strings"
)

func XdfReply(w http.ResponseWriter, opts map[string]interface{}) {
	var diceResult []die
	numToRoll := int(opts["df"].(float64))

	for i := 0; i < numToRoll; i++ {
		diceResult = append(diceResult, getDieResult())
	}
	var emoji []string
	for _, v := range diceResult {
		emoji = append(emoji, v.emoji)
	}

	embed := data.MessageEmbed{
		Title:       fmt.Sprintf("You rolled %d fate dice!", numToRoll),
		Color:       5027327,
		Description: fmt.Sprintf(strings.Join(emoji, " ")),
	}

	if opts["desc"] != nil {
		embed.Author.Name = strconv.Quote(opts["desc"].(string))
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
