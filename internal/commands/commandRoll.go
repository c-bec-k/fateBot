package commands

import (
	"encoding/json"
	"fmt"
	"github.com/c-bec-k/discgo/pkg/data"
	"net/http"
	"strconv"
	"strings"
)

func RollReply(w http.ResponseWriter, opts map[string]interface{}) {

	var mod int
	if opts["modifier"] != nil {
		mod = int(opts["modifier"].(float64))
	}

	var diceResult []die
	for i := 0; i < 4; i++ {
		diceResult = append(diceResult, getDieResult())
	}

	var emoji []string
	for _, v := range diceResult {
		emoji = append(emoji, v.emoji)
	}

	var total int
	for _, v := range diceResult {
		total += v.result
	}
	total += mod

	embed := data.MessageEmbed{
		Color:       5027327,
		Description: fmt.Sprintf("%v %+d", strings.Join(emoji, " "), mod),
	}

	if opts["description"] != nil {
		embed.Author.Name = strconv.Quote(opts["description"].(string))
	}

	if total >= -4 && total <= 8 {
		if total == 1 || total == 7 {
			embed.Title = fmt.Sprintf("You got an %v(%+d) result!", fateLadder[total], total)
		} else {
			embed.Title = fmt.Sprintf("You got a %v(%+d) result!", fateLadder[total], total)
		}
	} else {
		embed.Title = fmt.Sprintf("You got a %+d result!", total)
	}

	reply := data.InteractionResponse{
		Type: data.ChannelMessageWithSourceCallback,
		Data: data.InteractionCallbackData{
			Embeds: []data.MessageEmbed{embed},
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
