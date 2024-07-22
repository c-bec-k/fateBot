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
	{result: -1, emoji: "<:dFm:1264228207536640073>"},
	{result: 0, emoji: "<:dF0:1264228188775780434>"},
	{result: 1, emoji: "<:dFp:1264228218588626979>"},
}

func getDieResult() die {
	rand.Seed(time.Now().UnixNano())
	num := rand.Intn(len(dice))
	return dice[num]
}
