package commands

import (
	"math/rand"
	"time"
)

type die struct {
	result int
	emoji  string
}

var dice = []die{
	{result: -1, emoji: "<:dFm:940666692927905832>"},
	{result: 0, emoji: "<:dF0:763476296763179078>"},
	{result: 1, emoji: "<:dFp:940666693049544705>"},
}

func getDieResult() die {
	rand.Seed(time.Now().UnixNano())
	num := rand.Intn(len(dice))
	return dice[num]
}
