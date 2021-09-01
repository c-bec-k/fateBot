package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"github.com/c-bec-k/discgo/internal/commands"
	"github.com/c-bec-k/discgo/pkg/data"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

type config struct {
	port   int
	env    string
	token  string
	api    int
	pubkey string
}

type applicaiton struct {
	config   config
	logger   *log.Logger
	cmdCache map[data.Snowflake]func(http.ResponseWriter, map[string]interface{})
}

var (
	version   string
	UserAgent = "DiscordBot (https://github.com/c-bec-k/discgo, v0.1.0)"
)

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "addr", 80, "HTTP network address")
	flag.StringVar(&cfg.env, "env", "development", "Environment (development|staging|production)")
	flag.StringVar(&cfg.token, "token", "", "your bot token")
	flag.IntVar(&cfg.api, "api", 9, "default API version")
	flag.StringVar(&cfg.pubkey, "pubkey", "", "Your bot's public key")
	flag.Parse()

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	bot := applicaiton{
		config: cfg,
		logger: logger,
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/", bot.home)

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", bot.config.port),
		Handler:      mux,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	if cfg.token == "" {
		log.Fatal("You need to provide a bot token  to connect to the API!")
	}

	bot.cmdCache = map[data.Snowflake]func(http.ResponseWriter, map[string]interface{}){
		859956957145858059: commands.XdfReply,
		882295378437873664: commands.RollReply,
		882306410589847672: commands.LadderReply,
		867460583091077120: commands.SRDreply,
		882675083162832957: commands.InviteReply,
	}

	fmt.Printf("Running app on %v with version number %v\n", cfg.port, cfg.api)
	if //goland:noinspection ALL
	err := srv.ListenAndServeTLS("/etc/letsencrypt/live/discgo.hopto.org/fullchain.pem", "/etc/letsencrypt/live/discgo.hopto.org/privkey.pem"); err != nil {
		log.Fatalf("error: %v\n", err)
	}
}

func (app *applicaiton) home(w http.ResponseWriter, r *http.Request) {
	//goland:noinspection ALL
	verified := VerifyBot(r, app.config.pubkey)
	if !verified {
		http.Error(w, "signature mismatch", http.StatusUnauthorized)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "invalid request", http.StatusUnauthorized)
	}
	b, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	defer r.Body.Close()

	//goland:noinspection ALL
	apireq := data.Interaction{}

	err = json.Unmarshal(b, &apireq)
	if err != nil {
		fmt.Println("Verification failed")
		http.Error(w, err.Error(), 500)
		return
	}

	if apireq.Type == 1 {
		//fmt.Println("Verification successful! Sending JSON reply")
		jsonRes := `{"type": 1}`
		tokenHeader := fmt.Sprintf("bot %v", app.config.token)
		w.Header().Set("Authorization", tokenHeader)
		w.Header().Set("User-Agent", UserAgent)
		w.Write([]byte(jsonRes))
	}

	commandID := apireq.Data.ID
	opts := map[string]interface{}{}
	for _, v := range apireq.Data.Options {
		opts[v.Name] = v.Value
	}
	if fn, ok := app.cmdCache[commandID]; ok {
		fn(w, opts)
	}
}
