package main

import (
	"bytes"
	"crypto/rand"
	"encoding/binary"
	"fmt"
	"time"
)

// epoc time for timestamp (timestamp in cs is valid for ~43.5 years from epoc start)
var epoc = time.Date(2022, 7, 01, 0, 0, 0, 0, time.UTC)

func main() {
	var id uint64

	if num, err := CreateId(); err != nil {
		fmt.Println(err)
	} else {
		id = num
	}

	fmt.Printf("ID:  %d\n", id)
}

func CreateId() (uint64, error) {
	// empty byte slice to hold random bytes
	rando := make([]byte, 4)
	// fill byte slice with random bytes
	if _, err := rand.Read(rando); err != nil {
		fmt.Println(err)
		return 0, err
	}
	// convert random bytes to a bigEndian uint32
	buf := bytes.NewReader(rando)
	var num uint32
	if err := binary.Read(buf, binary.BigEndian, &num); err != nil {
		fmt.Println(err)
		return 0, err
	}
	// clamp number to first 27 bits
	num = num & 0x7ffffff

	// creates a Duration of nanoseconds
	now := time.Since(epoc)
	// convert ns to cs
	stamp := uint64(float64(now) * 0.0000001)

	// combine the timestamp with random number
	var id uint64 = stamp<<27 | uint64(num)

	return id, nil
}
