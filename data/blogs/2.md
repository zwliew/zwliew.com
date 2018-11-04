# Quick Guide to DHCP
The dynamic host configuration protocol, abbreviated as DHCP, is a protocol used in networks for servers to _dynamically_ assign IP addresses to clients in the network.

## Process
### 1. Discovery (DHCPDiscover)
The client broadcasts a message on the network to request IP address information from a DHCP server. This is usually done when the client first connects to the network and can be thought of as an attempt to _discover_ any DHCP servers.

### 2. Offer (DHCPOffer)
When the DHCP server receives the message from the client, it reserves an IP address and _offers_ it to the client. Note that multiple DHCP servers can offer an IP address to the same client.

### 3. Request (DHCPRequest)
When the client receives an offer from a server, it accepts the offer and broadcasts a message containing the IP address it has accepted. Note that when the client receives multiple offers from multiple servers, it accepts only one of them. The servers whose offers have been rejected will withdraw their offers when receiving the subsequent broadcasted DHCPRequest message.

### 4. Acknowledgement (DHCPAck)
When the DHCP server receives the DHCPRequest message, it broadcasts a message to _acknowledge_ it. At this point, the IP configuration for the client is complete and the client now has an IP address it can use.
