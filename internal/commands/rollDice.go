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
	{result: -1, emoji: "<:dF1:763476980363427840>"},
	{result: 0, emoji: "<:dF0:763476296763179078>"},
	{result: 1, emoji: "<:dF1:763476296805777431>"},
}

func getDieResult() die {
	rand.Seed(time.Now().UnixNano())
	num := rand.Intn(len(dice))
	return dice[num]
}
