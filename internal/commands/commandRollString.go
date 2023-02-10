package commands

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/c-bec-k/fateBot/pkg/data"
)

func RollStringReply(w http.ResponseWriter, opts map[string]interface{}) {
	// fmt.Println(opts)
	var trimmed = strings.TrimSpace(opts["roll"].(string))
	var split = strings.SplitN(trimmed, " ", 2)

	reply := data.InteractionResponse{}

	mod, err := strconv.Atoi(split[0])
	if err != nil {
		reply = data.InteractionResponse{
			Type: data.ChannelMessageWithSourceCallback,
			Data: data.InteractionCallbackData{
				Embeds: []data.MessageEmbed{
					{
						Title:       "",
						Description: "Please give the modifier as the first argument, a space, then and optional description.",
						Color:       5027327,
					},
				},
				Flags: data.Ephemeral,
			},
		}
		js, err := json.Marshal(reply)
		if err != nil {
			fmt.Println(err)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
		return
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

	if len(split) > 1 {
		str := strings.TrimLeft(split[1], "\"'“”‘’")
		str = strings.TrimRight(str, "\"'“”‘’")
		embed.Author.Name = strconv.Quote(str)
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

	reply = data.InteractionResponse{
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
